import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Mulai dengan loading=true

  useEffect(() => {
    // 1. Ambil sesi awal
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsAuthenticated(true);
        setUser(session.user);
      }
      setIsLoading(false); // Sesi awal sudah dicek
    });

    // 2. Dengarkan perubahan status auth (login/logout)
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) {
        // Jika statusnya SIGNED_IN
        setIsAuthenticated(true);
        setUser(session.user);
      } else {
        // Jika statusnya SIGNED_OUT
        setIsAuthenticated(false);
        setUser(null);
      }
      // setIsLoading(false) tidak diperlukan di sini karena sudah diatur di getSession
    });

    // Clean-up function: Hentikan subscription saat komponen di-unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []); // Array dependensi kosong agar hanya berjalan sekali saat mount

  return { isAuthenticated, user, isLoading };
};

export default useAuth;
