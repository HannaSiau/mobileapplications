import type { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../../lib/supabase';
import type { User } from '../types/User';

async function getProfileName(userId: string): Promise<string> {
  const { data, error } = await supabase
    .from('profiles')
    .select('name')
    .eq('id', userId)
    .single();

  if (error) return '';
  return data?.name ?? '';
}

async function toAppUser(user: SupabaseUser): Promise<User> {
  return {
    id: user.id,
    email: user.email ?? '',
    name: await getProfileName(user.id),
  };
}

export async function register(
  email: string,
  password: string,
  name: string
): Promise<User | null> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });

  if (error) throw new Error(error.message);
  if (!data.user || !data.session) return null; 
  return toAppUser(data.user);
}

export async function login(email: string, password: string): Promise<User> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) throw new Error(error.message);
  
  if (!data.user || !data.session) throw new Error('Login failed: no session returned');

  return toAppUser(data.user);
}

export async function logout(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function getCurrentUser(): Promise<User | null> {
  const { data } = await supabase.auth.getSession();
  const session = data.session;
  return session ? toAppUser(session.user) : null;
}
