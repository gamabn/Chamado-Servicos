import NextAut from "next-auth/next";
import {authOptions} from '@/lib/auth'

const handler = NextAut(authOptions);

export {handler as GET, handler as POST};