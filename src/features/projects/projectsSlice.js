import{createSlice,createAsyncThunk}from'@reduxjs/toolkit';
import api from '../../services/apiConnector';

export const fetchProjects=createAsyncThunk("projects/fetchProjects",
  async(_,thunkAPI)=>{
    try{
      const token=thunkAPI.getState().auth.token;
        const res=await api.get("/projects",{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
        return res.data.projects;
      }
      catch(error){
        return thunkAPI.rejectWithValue(error.response.data);
      }
    }
  );

  const projectSlice=createSlice({
    name:"projects",
    initialState:{
      projects:[],
      loading:false,
    },
    reducers:{},
    extraReducers:(builder)=>{
      builder
         .addCase(fetchProjects.pending,(state)=>{
           state.loading=true;
         })
         .addCase(fetchProjects.fulfilled,(state,action)=>{
           state.loading=false;
           state.projects=action.payload;
         })
         .addCase(fetchProjects.rejected,(state,action)=>{
           state.loading=false;
           console.error("Error fetching projects:", action.payload);
         });
    }
  })

  export default projectSlice.reducer;