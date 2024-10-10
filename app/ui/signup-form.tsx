// import { signup } from '@/app/actions/auth';
// import { Button } from '@nextui-org/button';
// import { Input } from '@nextui-org/input';
// import { useFormState, useFormStatus } from 'react-dom';

// export function SignupForm() {
//   const [state, action] = useFormState(signup, undefined);

//   return (
//     <form className='flex flex-col gap-4 py-8' action={action}>
//       <Input
//         type="email"
//         label="Email"
//         name='email'
//         isInvalid={!!state?.errors?.email} errorMessage={state?.errors?.email} />

//       <Input
//         type="password"
//         name='password'
//         label="Password"
//         isInvalid={!!state?.errors?.password}
//         errorMessage={(
//           <div>
//             <p>Password must:</p>
//             <ul>
//               {state?.errors?.password && state.errors.password.map((error) => (
//                 <li key={error}>- {error}</li>
//               ))}
//             </ul>
//           </div>
//         )} />

//       <p aria-live="polite">{state?.message}</p>
//       <SubmitButton />
//     </form>
//   );
// }

// function SubmitButton() {
//   const { pending } = useFormStatus();

//   return (
//     <Button disabled={pending} type="submit">
//       Sign Up
//     </Button>
//   );
// }