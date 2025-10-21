import {
	Content as SelectContent,
	Icon as SelectIcon,
	Item as SelectItem,
	ItemText as SelectItemText,
	Portal as SelectPortal,
	Root as SelectRoot,
	Trigger as SelectTrigger,
	Value as SelectValue,
	Viewport as SelectViewport,
} from '@radix-ui/react-select'
import { ArrowRight, Calendar, ChevronDown, Tag, User } from 'lucide-react'
import { useMemo, useState } from 'react'

// Tipos esperados desde SSR
export type PostData = {
	title: string
	slug: string
	excerpt: string
	publishedAt: string
	image: string
	categories: string[]
	authorName?: string
	authorImage?: string
}

export type Category = { title: string }

type Props = {
	posts: PostData[]
	categories: Category[]
}

// Utilidades de presentación (copiadas del estilo existente)
type ColorVariant = 'lavender' | 'orchid' | 'mint' | 'coral' | 'sunshine'

function normalizeEs(s: string) {
	// Eliminar marcas diacríticas usando clase Unicode con bandera 'u'
	return (s || '').normalize('NFD').replace(/\p{M}/gu, '')
}

function formatDate(dateString: string) {
	if (!dateString) {
		return ''
	}
	const d = new Date(dateString)
	if (Number.isNaN(d.getTime())) {
		return ''
	}
	return d.toLocaleDateString('es-ES', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})
}

const SENTENCE_SPLIT_RE = /(?<=[.!?])\s+/

function firstSentence(text?: string) {
	if (!text) {
		return ''
	}
	const parts = String(text).split(SENTENCE_SPLIT_RE)
	return (parts[0] || '').trim()
}

function colorForCategory(title?: string): ColorVariant {
	const t = normalizeEs((title || '').toLowerCase())
	if (t.includes('sensor')) {
		return 'mint'
	}
	if (t.includes('psico') || t.includes('motric')) {
		return 'sunshine'
	}
	if (t.includes('famil')) {
		return 'coral'
	}
	if (t.includes('juego') || t.includes('lud')) {
		return 'sunshine'
	}
	if (t.includes('infantil') || t.includes('nin') || t.includes('desarrollo')) {
		return 'orchid'
	}
	return 'lavender'
}

function chipClassesFor(variant: ColorVariant): string {
	switch (variant) {
		case 'orchid':
			return 'inline-flex items-center gap-1 bg-orchid-100 text-orchid-700 px-3 py-1 rounded-full text-sm font-medium'
		case 'mint':
			return 'inline-flex items-center gap-1 bg-mint-100 text-mint-700 px-3 py-1 rounded-full text-sm font-medium'
		case 'coral':
			return 'inline-flex items-center gap-1 bg-coral-100 text-coral-700 px-3 py-1 rounded-full text-sm font-medium'
		case 'sunshine':
			return 'inline-flex items-center gap-1 bg-sunshine-100 text-sunshine-700 px-3 py-1 rounded-full text-sm font-medium'
		default:
			return 'inline-flex items-center gap-1 bg-lavender-100 text-lavender-700 px-3 py-1 rounded-full text-sm font-medium'
	}
}

// CTA fijo para hero (independiente de la categoría)
const CTA_BUTTON_CLASSES =
	'inline-flex items-center gap-2 bg-mint-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-mint-700 transition-colors group/btn'

function sortByDateDesc(arr: PostData[]): PostData[] {
	return arr
		.slice()
		.sort(
			(a, b) =>
				new Date(b.publishedAt || 0).getTime() -
				new Date(a.publishedAt || 0).getTime(),
		)
}

export function BlogFilterIsland({ posts, categories }: Props) {
	const [activeCategory, setActiveCategory] = useState<string>('all')

	const sorted = useMemo(() => sortByDateDesc(posts), [posts])

	const filtered = useMemo(() => {
		if (activeCategory === 'all') {
			return sorted
		}
		const needle = normalizeEs(activeCategory.toLowerCase())
		return sorted.filter((p) =>
			(p.categories || [])
				.map((c) => normalizeEs(c.toLowerCase()))
				.some((t) => t.includes(needle)),
		)
	}, [sorted, activeCategory])

	const featured = activeCategory === 'all' ? sorted[0] : filtered[0]
	const gridItems = (filtered || []).filter((p) => p.slug !== featured?.slug)

	return (
		<div>
			{/* Filtros: estilo compacto, alineados a la izquierda (tipo chips) */}
			<div className="mx-auto max-w-7xl">
				{/* Selector móvil */}
				<div className="md:hidden px-4 mb-8">
					<SelectRoot
						value={activeCategory}
						onValueChange={(val) => setActiveCategory(val)}
					>
						<SelectTrigger
							className="inline-flex w-full items-center justify-between rounded-full bg-moody-blue-700 text-white px-4 py-2 shadow-sm ring-1 ring-moody-blue-600/50 focus:outline-none focus:ring-2 focus:ring-white/70"
							aria-label="Filtrar por categoría"
						>
							<SelectValue placeholder="Todos los posts" />
							<SelectIcon>
								<ChevronDown size={16} className="opacity-90" />
							</SelectIcon>
						</SelectTrigger>
						<SelectPortal>
							<SelectContent className="rounded-xl bg-white shadow-xl border border-moody-blue-100">
								<SelectViewport className="p-1">
									<SelectItem
										value="all"
										className="cursor-pointer select-none rounded-md px-3 py-2 text-sm hover:bg-moody-blue-50"
									>
										<SelectItemText>Todos los posts</SelectItemText>
									</SelectItem>
									{categories.map((c) => (
										<SelectItem
											key={c.title}
											value={c.title}
											className="cursor-pointer select-none rounded-md px-3 py-2 text-sm hover:bg-moody-blue-50"
										>
											<SelectItemText>{c.title}</SelectItemText>
										</SelectItem>
									))}
								</SelectViewport>
							</SelectContent>
						</SelectPortal>
					</SelectRoot>
				</div>

				{/* Chips desktop */}
				<div className="hidden md:flex justify-start mb-10">
					<div className="inline-flex flex-wrap items-center gap-1 rounded-full bg-moody-blue-700 p-1 shadow-sm ring-1 ring-moody-blue-600/50">
						<button
							type="button"
							className={`cursor-pointer category-filter rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
								activeCategory === 'all'
									? 'bg-white text-moody-blue-700 shadow'
									: 'bg-transparent text-white/90 hover:text-white'
							}`}
							aria-pressed={activeCategory === 'all'}
							onClick={() => setActiveCategory('all')}
						>
							Todos los posts
						</button>
						{categories.map((c) => (
							<button
								key={c.title}
								type="button"
								className={`cursor-pointer category-filter rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 ${
									activeCategory === c.title
										? 'bg-white text-moody-blue-700 shadow'
										: 'bg-transparent text-white/90 hover:text-white'
								}`}
								aria-pressed={activeCategory === c.title}
								onClick={() => setActiveCategory(c.title)}
							>
								{c.title}
							</button>
						))}
					</div>
				</div>
			</div>

			{/* Hero destacado */}
			{featured && (
				<div id="featured-container" className="mt-2 mb-10">
					<article className="w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-moody-blue-100/60">
						<div className="grid grid-cols-1 md:grid-cols-2">
							<div className="bg-moody-blue-700 text-white p-8 md:p-10 flex flex-col justify-center">
								{featured.categories?.length > 0 && (
									<div className="flex flex-wrap gap-2 mb-4">
										{featured.categories.slice(0, 2).map((t) => (
											<span
												key={t}
												className={chipClassesFor(colorForCategory(t))}
											>
												<Tag size={12} />
												{t}
											</span>
										))}
									</div>
								)}
								<h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
									{featured.title}
								</h2>
								{featured.excerpt && (
									<p className="text-moody-blue-100/90 mb-6">
										{firstSentence(featured.excerpt)}
									</p>
								)}
								<div>
									<a
										href={`/blog/${featured.slug}`}
										className={CTA_BUTTON_CLASSES}
									>
										Leer artículo
										<ArrowRight
											size={16}
											className="group-hover/btn:translate-x-1 transition-transform"
										/>
									</a>
								</div>
							</div>
							<div className="relative bg-moody-blue-50 h-64 md:h-full min-h-[320px]">
								{featured.image && (
									<img
										src={featured.image}
										alt={featured.title}
										className="w-full h-full object-cover"
										loading="lazy"
									/>
								)}
							</div>
						</div>
					</article>
				</div>
			)}

			{/* Mensaje vacío */}
			{activeCategory !== 'all' && filtered.length === 0 && (
				<div id="no-posts" className="text-center py-16">
					<div className="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
						<div className="text-moody-blue-300 mb-4">
							<svg
								className="w-16 h-16 mx-auto"
								fill="currentColor"
								viewBox="0 0 20 20"
								aria-hidden="true"
							>
								<title>Sin resultados</title>
								<path
									fillRule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
									clipRule="evenodd"
								/>
							</svg>
						</div>
						<h3 className="text-xl font-semibold text-gray-900 mb-2">
							No hay posts en esta categoría
						</h3>
						<p className="text-gray-600">
							Prueba seleccionando otra categoría o vuelve a "Todos los posts"
						</p>
					</div>
				</div>
			)}

			{/* Grilla */}
			<div className="mx-auto max-w-7xl mt-2">
				<div
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
					id="posts-grid"
				>
					{gridItems.map((post, index) => (
						<article
							key={post.slug}
							className="post-card bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-moody-blue-100/50"
							style={{ animationDelay: `${index * 0.1}s` }}
						>
							<a href={`/blog/${post.slug}`} className="block">
								{post.image && (
									<div className="relative overflow-hidden h-48">
										<img
											src={post.image}
											alt={post.title}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
											loading="lazy"
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
									</div>
								)}

								<div className="p-6">
									<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
										<div className="flex flex-wrap gap-2">
											{post.categories?.slice(0, 1).map((t) => (
												<span
													key={t}
													className={chipClassesFor(colorForCategory(t))}
												>
													<Tag size={12} />
													{t}
												</span>
											))}
										</div>
										{post.publishedAt && (
											<span className="flex items-center gap-1 text-sm text-gray-500">
												<Calendar size={14} />
												{formatDate(post.publishedAt)}
											</span>
										)}
									</div>

									<h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-moody-blue-700 transition-colors line-clamp-2">
										{post.title}
									</h2>

									{(post.authorName || post.authorImage) && (
										<div className="flex items-center gap-3">
											{post.authorImage ? (
												<img
													src={post.authorImage}
													alt={post.authorName || 'Autor'}
													className="w-8 h-8 rounded-full object-cover"
												/>
											) : (
												<User size={18} className="text-gray-500" />
											)}
											<span className="text-sm text-gray-700">
												{post.authorName || 'Autor desconocido'}
											</span>
										</div>
									)}
								</div>
							</a>
						</article>
					))}
				</div>
			</div>
		</div>
	)
}
