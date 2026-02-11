import { Link } from '@tanstack/react-router';

import notFoundImage from '../assets/images/404-error-page.svg';

import { Button } from '@/components/ui/button';

export function NotFound() {
  return (
    <div className="flex w-full flex-col items-center justify-center p-4">
      <img aria-hidden="true" src={notFoundImage} alt="" className="w-140" />

      <p>Tente alguma dessas aqui</p>

      <nav className="mt-4">
        <ul className="flex items-center gap-2">
          <li>
            <Button asChild>
              <Link to="/produtos" replace>
                Produtos
              </Link>
            </Button>
          </li>

          <li>
            <Button asChild>
              <Link to="/materias-primas" replace>
                Matérias Primas
              </Link>
            </Button>
          </li>

          <li>
            <Button asChild>
              <Link to="/relatorio-de-producao" replace>
                Relatório de Produção
              </Link>
            </Button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
