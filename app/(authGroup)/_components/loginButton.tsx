"use client"
import { Button } from "@/components/ui/button"

const LoginButton = () => {
    console.log(process.env.NEXT_PUBLIC_BACKEND_API_URL, 'Hello')
    return (
        <Button> Login
            {process.env.NEXT_PUBLIC_BACKEND_API_URL}
        </Button>
    )
}

export default LoginButton