'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { FetchState } from '@/enums/Fetch';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { selectUser, signIn } from '@/redux/reducers/user';
import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Eye as EyeIcon } from '@phosphor-icons/react/dist/ssr/Eye';
import { EyeSlash as EyeSlashIcon } from '@phosphor-icons/react/dist/ssr/EyeSlash';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import type { SignInParams } from '@/types/user';
import { useUser } from '@/hooks/use-user';

const schema = zod.object({
  email: zod.string().min(1, { message: 'Email is required' }).email(),
  password: zod.string().min(1, { message: 'Password is required' }),
  position: zod.string(),
});

const defaultValues = { email: '', password: '', position: 'hrd' } satisfies SignInParams;

export function SignInForm(): React.JSX.Element {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userState = useAppSelector(selectUser);

  const { checkSession } = useUser();

  const [showPassword, setShowPassword] = React.useState<boolean>();

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInParams>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: SignInParams): Promise<void> => {
      try {
        const promise = await dispatch(signIn(values)).unwrap();
        if(!promise.token){
          throw new Error('Invalid login!')
        }
        localStorage.setItem('custom-auth-token', promise?.token);
        
      } catch (error) {
        setError('root', { type: 'server', message: error?.message });
        return;
      }

      // Refresh the auth state
      await checkSession?.();

      // UserProvider, for this case, will not refresh the router
      // After refresh, GuestGuard will handle the redirect
      router.refresh();
    },
    [checkSession, dispatch, router, setError]
  );

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Sign in</Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)}>
                <InputLabel>Email address</InputLabel>
                <OutlinedInput {...field} label="Email address" type="email" />
                {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)}>
                <InputLabel>Password</InputLabel>
                <OutlinedInput
                  {...field}
                  endAdornment={
                    showPassword ? (
                      <EyeIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(false);
                        }}
                      />
                    ) : (
                      <EyeSlashIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(true);
                        }}
                      />
                    )
                  }
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button disabled={userState.status === FetchState.LOADING} type="submit" variant="contained">
            {userState.status === FetchState.LOADING ? 'Loading...' : 'Sign in'}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
