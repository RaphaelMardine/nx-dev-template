import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useToast } from '@v4company/ui-components';

const GoogleLoginButton = ({
  signInFunction,
}: {
  signInFunction: ({ tokenId }: { tokenId: string }) => void;
}) => {
  const { toast } = useToast();

  return (
    <GoogleLogin
      theme="filled_black"
      shape="pill"
      width={300}
      onSuccess={(credentialResponse) => {
        if (credentialResponse.credential) {
          signInFunction({ tokenId: credentialResponse.credential });
        }
      }}
      onError={() => {
        toast({
          title: 'Falha ao fazer login com o Google',
          description:
            'Ocorreu um erro ao tentar realizar o login, tente novamente mais tarde ou entre em contato com o suporte!',
          variant: 'destructive',
        });
      }}
    />
  );
};

export default GoogleLoginButton;
