import { GithubLogo } from 'phosphor-react'

export function Footer(props) {
  return (
    <footer className="flex items-center justify-center w-full h-24 border-t-4 border-purple-600">
      <a
        className="flex items-center justify-center"
        href="https://github.com/my-slab/camelot-wheel-fuser"
        target="_blank"
        rel="noopener noreferrer"
      >
        View on GitHub <GithubLogo size={32} />
      </a>
    </footer>
  )
}
