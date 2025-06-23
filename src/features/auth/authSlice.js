import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../services/apiConnector';

const tokenFromStorage=localStorage.getItem('token');

export const loginUser=createAsyncThunk(
  'auth/loginUser',
  async(data,thunkAPI)=>{
    try{
      const res=await api.post('/auth/login',data);
      localStorage.setItem("token",res.data.token);
      return {...res.data,token:res.data.token};
    }
    catch(error){
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const signupUser=createAsyncThunk(
  'auth/signupUser',
  async(data,thunkAPI)=>{
    try{
      const res=await api.post('/auth/signup',data);
      localStorage.setItem("token",res.data.token);
      return {...res.data,token:res.data.token};
    }
    catch(error){
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


// finally make the auth slice
const authSlice=createSlice({
  name:"auth",
  initialState:{
    isAuthenticated: !!tokenFromStorage,
    token:tokenFromStorage||null,
    user:null,
    resumeFileName:null,
    loading:false,
  },
  reducers:{
    logout:(state)=>{
      state.isAuthenticated=false;
      state.token=null;
      state.user=null;
      state.resumeFileName=null;
      localStorage.removeItem('token');
    },
    setResumeFileName:(state,action)=>{
      state.resumeFileName=action.payload;
    },

  },
  extraReducers:(builder)=>{
    builder
       .addCase(loginUser.pending,(state)=>{state.loading=true;})
       .addCase(loginUser.fulfilled,(state,action)=>{
        state.loading=false;
        state.isAuthenticated=true;
        state.token=action.payload.token;
        state.user=action.payload.user;
      })
      .addCase(loginUser.rejected, (state) => { state.loading = false; })
      .addCase(signupUser.pending,(state)=>{state.loading=true;})
      .addCase(signupUser.fulfilled,(state,action)=>{
        state.loading=false;
        state.isAuthenticated=true;
        state.token=action.payload.token;
        state.user=action.payload.user;
      })
      .addCase(signupUser.rejected, (state) => { state.loading = false; })
  },
});

export const {logout,setResumeFileName}=authSlice.actions;
export default authSlice.reducer;
