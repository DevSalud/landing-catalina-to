import type { ReactNode } from 'react'
import { urlFor } from '../../lib/sanity.ts'

// Tipos auxiliares para evitar 'any' y mejorar lectura
type MaybeLink = { href?: string } | undefined
// El tipo de fuente de imagen de Sanity coincide con el primer parámetro de urlFor
type SanityImageSource = Parameters<typeof urlFor>[0]
type MaybeImage = (SanityImageSource & { alt?: string }) | undefined

// Props base para renderers de PortableText
type PtBaseProps = { children?: ReactNode }
type PtLinkProps = PtBaseProps & { value?: MaybeLink }
type PtImageProps = { value?: MaybeImage; children?: ReactNode }

// Regex de enlaces externos definido a nivel superior para rendimiento
const EXTERNAL_LINK_RE = /^https?:\/\//

// Renderers de Portable Text (TSX) para usar en archivos .astro
export const portableComponents = {
	block: {
		h1: (props: PtBaseProps) => (
			<h1 className="text-4xl font-bold text-moody-blue-700 mb-4">
				{props.children}
			</h1>
		),
		h2: (props: PtBaseProps) => (
			<h2 className="text-3xl font-bold text-moody-blue-700 mt-8 mb-4">
				{props.children}
			</h2>
		),
		h3: (props: PtBaseProps) => (
			<h3 className="text-2xl font-semibold text-moody-blue-700 mt-6 mb-3">
				{props.children}
			</h3>
		),
		h4: (props: PtBaseProps) => (
			<h4 className="text-xl font-semibold text-moody-blue-700 mt-4 mb-2">
				{props.children}
			</h4>
		),
		normal: (props: PtBaseProps) => (
			<p className="mb-6 leading-relaxed">{props.children}</p>
		),
		blockquote: (props: PtBaseProps) => (
			<blockquote className="border-l-4 border-moody-blue-600 bg-moody-blue-50 italic p-4 my-6 rounded">
				{props.children}
			</blockquote>
		),
	},
	marks: {
		strong: (props: PtBaseProps) => (
			<strong className="font-bold text-moody-blue-700">
				{props.children}
			</strong>
		),
		em: (props: PtBaseProps) => <em className="italic">{props.children}</em>,
		link: (props: PtLinkProps) => {
			const href = (props.value as MaybeLink)?.href || '#'
			const external = EXTERNAL_LINK_RE.test(href)
			return (
				<a
					href={href}
					target={external ? '_blank' : undefined}
					rel={external ? 'noopener' : undefined}
					className="text-moody-blue-700 underline hover:text-moody-blue-800"
				>
					{props.children}
				</a>
			)
		},
	},
	list: {
		bullet: (props: PtBaseProps) => (
			<ul className="my-6 list-disc pl-6">{props.children}</ul>
		),
		number: (props: PtBaseProps) => (
			<ol className="my-6 list-decimal pl-6">{props.children}</ol>
		),
	},
	types: {
		image: (props: PtImageProps) => {
			const v = props.value as MaybeImage
			return (
				<figure className="my-8">
					{v && (
						<img
							src={urlFor(v).width(1200).url()}
							alt={v?.alt || ''}
							className="rounded-xl shadow"
							loading="lazy"
						/>
					)}
				</figure>
			)
		},
	},
}
