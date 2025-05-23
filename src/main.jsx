// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import "./index.css";
import "swiper/css";

import AllRoutes from "./routes/AllRoutes.jsx";
import { Bounce, ToastContainer } from "react-toastify";
import AuthProvider from "./provider/AuthProvider.jsx";
import { Toaster } from "sonner";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <Toaster />
        <AllRoutes />
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
);
