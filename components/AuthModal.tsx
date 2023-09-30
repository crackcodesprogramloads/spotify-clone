"use client";

import { useEffect } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import {
  useSessionContext,
  useSupabaseClient,
} from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

import useAuthModal from "@/hooks/useAuthModal";

import Modal from "./Modal";

const AuthModal = () => {
  const { session } = useSessionContext();
  const router = useRouter();

  const { onClose, isOpen, isSignUp } = useAuthModal();

  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [session, router, onClose]);

  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Modal
      title={isSignUp ? "Welcome!" : "Welcome back!"}
      description=""
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        supabaseClient={supabaseClient}
        view={isSignUp ? "sign_up" : "sign_in"}
        providers={["github"]}
        magicLink={true}
        localization={{
          variables: {
            sign_up: {
              button_label: "Sign up",
              password_label: "Create a Password",
              loading_button_label: "Signing up ...",
              social_provider_text: "Sign up with Github",
              link_text: "Need have an account? Sign up",
            },
            sign_in: {
              button_label: "Sign in",
              password_label: "Your Password",
              loading_button_label: "Signing in ...",
              social_provider_text: "Sign in with Github",
              link_text: "Already have an account? Sign in",
            },
          },
        }}
        appearance={{
          theme: ThemeSupa,

          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22c55e",
              },
            },
          },
        }}
        theme="dark"
      />
    </Modal>
  );
};

export default AuthModal;
