import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import api from "../services/apiConnector";
import { useEffect } from "react";
import { setResumeFileName } from "../features/auth/authSlice";
import { fetchLatestResumeFileName } from "../features/auth/AuthService";

export default function ResumeDownloadButton() {
  const { token, resumeFileName } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const getFileName = async () => {
      if (token && !resumeFileName) {
        try {
          const fileName = await fetchLatestResumeFileName(token);
          if (fileName) {
            dispatch(setResumeFileName(fileName));
          }
        } catch (error) {
          console.error("Error fetching resume file name:", error);
          toast.error("Failed to fetch resume file name.");
        }
      }
    };
    getFileName();
  }, [token, resumeFileName, dispatch]);

  const handleDownload = async () => {
    if (!token) {
      toast.error("You need to be logged in to download the resume.");
      return;
    }
    if (!resumeFileName) {
      toast.error("Resume Not Avaialble");
      return;
    }

    try {
      const response = await api.get(`/cv/${resumeFileName}`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "resume.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Resume downloaded successfully!");
    } catch (error) {
      console.error("Error downloading resume:", error);
      toast.error("Failed to download resume.");
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="border border-green-400 text-green-400 px-6 py-2 rounded-full font-mono font-bold hover:bg-green-400 hover:text-gray-900 transition flex items-center gap-2"
    >
      DOWNLOAD CV <span className="ml-2">⬇️</span>
    </button>
  );
}
