import { gql, useMutation } from "@apollo/client";
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Logo } from "../components/Logo";

const CREATE_SUBSCRIPTION_MUTATION = gql `
        mutation CreateSubscriber($name: String!, $email: String!) {
            createSubscriber(data: {name: $name, email: $email}) {
                id
        }
    }
`

export function Subscribe() {

    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const [createSubscriber, { loading }] = useMutation(CREATE_SUBSCRIPTION_MUTATION)

    async function handleSubscription(event: FormEvent){
        event.preventDefault();

        await createSubscriber({
            variables: {
                name,
                email
            }
        })

        navigate('/event')
    }

    return (
        <div className="min-h-screen bg-blur bg-cover bg-no-repeat flex flex-col items-center">
            <div className="w-full max-w-[1100px] flex items-center justify-between mt-20 mx-auto">
                <div className="max-w-[640px]">
                    <Logo />

                    <h1 className="mt-8 text-[2.5rem] leading-tight">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum libero assumenda facilis.
                    </h1>
                    <p className="mt-4 text-gray-200 leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis veniam quas delectus incidunt optio ducimus eos tempora neque. Tempore, commodi porro? Corporis, sunt fugiat laboriosam eligendi tenetur distinctio quasi minus.
                    </p>
                </div>
                <div className="p-8 bg-gray-700 border border-gray-500 rounded">
                    <strong className="text-2xl mb-6 block">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</strong>

                    <form action="" className="flex flex-col gap-2 w-full">
                        <input 
                            type="text" placeholder="Seu nome completo" 
                            className="bg-gray-900 rounded px-5 h-14"
                            onChange={e => setName(e.target.value)}
                            />

                        <input 
                            type="email" placeholder="Digite seu email" 
                            className="bg-gray-900 rounded px-5 h-14"
                            onChange={e => setEmail(e.target.value)}
                            />

                            <button type="submit" className="mt-4 bg-green-500 uppercase py-4 rounded font-bold text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
                                disabled={loading}
                            >
                                Faça sua inscrição
                            </button>
                    </form>
                </div>
            </div>

            <img src="/src/assets/code-mockup.png" className="mt-10" alt="" />
        </div>
    )
}