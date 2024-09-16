import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const usersCollectionRef = collection(db, "users");

export const getUser = createAsyncThunk("user/getUser", async () => {
   const response = await getDocs(usersCollectionRef);
   const data = response.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
   return data;
});

const initialState = {
   user: [],
};

const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      setUser(state, action) {
         state.user.push(action.payload);
      },

      updataUserIs(state, action) {
         const toggleStatus = state.user.find(
            (item) => item.id === action.payload.id
         );
         toggleStatus.status = !toggleStatus.status;
      },

      deleteUserIs(state, action) {
         const userId = action.payload;
         state.user = current(state.user).filter((item) => item.id !== userId);
      },
   },
   extraReducers: (builder) => {
      builder.addCase(getUser.pending, (state) => {
         state.status = "loading";
      });
      builder.addCase(getUser.fulfilled, (state, action) => {
         state.status = "success";
         state.user.push(...action.payload);
      });
      builder.addCase(getUser.rejected, (state) => {
         state.status = "failed";
      });
   },
});

export const { setUser, deleteUserIs, updataUserIs } = userSlice.actions;

export default userSlice.reducer;
