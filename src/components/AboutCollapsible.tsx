import { ChevronUp } from 'lucide-react'
import { useState } from 'react'
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from './ui/collapsible.tsx'

export const AboutCollapsible = () => {
	const [open, setOpen] = useState(false)
	return (
		<Collapsible open={open} onOpenChange={setOpen}>
			<CollapsibleContent className="animate-accordion-down">
				<p className="text-gray-800 text-lg mb-10">
					Mis métodos de intervención se basan principalmente en el{' '}
					<span className="font-semibold text-moody-blue-700">juego</span>,
					donde potencio las habilidades del infante/joven con actividades{' '}
					<span className="font-semibold text-moody-blue-700">
						lúdicas y entretenidas
					</span>
					, fomentando tanto su motivación como el trabajo guiado.
				</p>

				<p className="text-gray-800 text-lg mb-10">
					En resumen, ayudo a cada niño con diversas dificultades a que se
					desenvuelva lo mejor posible en su vida diaria, siempre velando por su
					bienestar y apoyando no solo a la persona a tratar, sino que también a
					sus redes, ya sea familia, escuela, entre otros.
				</p>

				<p className="text-gray-800 text-lg mb-10">
					Si estás buscando apoyo terapéutico, estaré muy feliz de ayudarte.
					¡Puedes escribirme para cualquier consulta!
				</p>
			</CollapsibleContent>
			<CollapsibleTrigger
				asChild={true}
				className="flex items-center justify-between w-fit"
			>
				<button
					type="button"
					className="flex gap-10 items-center border-2 border-moody-blue-700 rounded-lg px-4 py-2 cursor-pointer text-moody-blue-700 hover:bg-moody-blue-700 hover:text-white transition-colors duration-300 ease-in-out"
				>
					{open ? 'Leer menos' : 'Leer más'}
					{open ? <ChevronUp /> : <ChevronUp className="rotate-180" />}
				</button>
			</CollapsibleTrigger>
		</Collapsible>
	)
}
