import { redirect } from "next/navigation";

export function GET(request: Request) {
    redirect('/admin')
}