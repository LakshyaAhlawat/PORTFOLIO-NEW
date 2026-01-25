const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_BUCKET = process.env.SUPABASE_BUCKET || 'resume-pdfs';
const SUPABASE_IMAGE_BUCKET = process.env.SUPABASE_IMAGE_BUCKET || 'project-images';

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.warn('Supabase Storage is not fully configured. Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in server/.env');
}

const supabase = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  : null;

const uploadPdfBuffer = async ({ buffer, filename }) => {
  if (!supabase) {
    throw new Error('Supabase client not configured');
  }
  return await uploadBuffer({ buffer, filename: `${filename}.pdf`, mimeType: 'application/pdf', bucket: SUPABASE_BUCKET });
};

const uploadBuffer = async ({ buffer, filename, mimeType = 'application/octet-stream', bucket = SUPABASE_IMAGE_BUCKET }) => {
  if (!supabase) {
    throw new Error('Supabase client not configured');
  }
  const objectPath = filename;

  // attempt upload, and if bucket missing, try creating it then retry once
  const doUpload = async () => {
    return await supabase.storage
      .from(bucket)
      .upload(objectPath, buffer, {
        contentType: mimeType,
        upsert: true,
      });
  };

  let { error: uploadError } = await doUpload();

  if (uploadError) {
    const msg = String(uploadError?.message || uploadError);
    const isBucketNotFound = /bucket not found/i.test(msg) || /no such bucket/i.test(msg) || uploadError?.statusCode === '404';
    if (isBucketNotFound) {
      // Try to create the bucket (public) and retry upload
      try {
        const { data: createData, error: createErr } = await supabase.storage.createBucket(bucket, { public: true });
        if (createErr) {
          throw createErr;
        }
      } catch (createErr) {
        throw new Error(`Failed to create Supabase bucket '${bucket}': ${createErr?.message || createErr}`);
      }

      // retry upload once
      const retry = await doUpload();
      uploadError = retry.error;
      if (uploadError) {
        throw uploadError;
      }
    } else {
      throw uploadError;
    }
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(objectPath);
  if (!data || !data.publicUrl) {
    throw new Error('Failed to get public URL for uploaded asset');
  }
  return {
    secure_url: data.publicUrl,
    public_id: objectPath,
  };
};

const deleteAsset = async (publicId) => {
  if (!supabase || !publicId) return;
  await supabase.storage.from(SUPABASE_BUCKET).remove([publicId]);
};

module.exports = {
  uploadPdfBuffer,
  uploadBuffer,
  deleteAsset,
};
