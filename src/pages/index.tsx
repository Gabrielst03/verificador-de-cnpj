import { Inter } from 'next/font/google';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { fetchCnpj } from '@/hooks/fetchCnpj';
import { BadgeCheck, GithubIcon } from 'lucide-react';

import { ToastContainer, toast } from 'react-toastify';
import Link from 'next/link';


const inter = Inter({ subsets: ['latin'] });

interface IEmpresa {
  razao_social: string;
  cnpj: string;
  qsa: Array<{ nome_socio: string }>;
  logradouro: string;
  municipio: string;
  uf: string;
  natureza_juridica: string;
  cnae_fiscal_descricao: string;
  data_inicio_atividade: string;
}

export default function Home() {
  const [cnpj, setCnpj] = useState<string>('');
  const [empresa, setEmpresa] = useState<IEmpresa | undefined>();


  function removeSpecialCharacters(cnpj: string): string {
    // Expressão regular para remover todos os caracteres especiais do CNPJ
    // Ex: Isso 47.960.950/0001-21 se torna isso === 47960950000121
    return cnpj.replace(/[^\d]/g, '');
  }

  const findCnpj = async () => {
    try {
      const cnpjWithoutSpecialChars = removeSpecialCharacters(cnpj);

      const data = await fetchCnpj(cnpjWithoutSpecialChars);

      toast.success('CNPJ Encontrado!')

      setEmpresa(data);
    } catch (error) {
      toast.error('CNPJ Não encontado!')
    }
  }




  return (
    <main
      className={`flex min-h-screen flex-col w-full items-center mt-12 ${inter.className}`}
    >
      <ToastContainer theme='dark' />
      <div className='flex flex-col items-center w-[800px]'>
        <h1 className='text-2xl'>Verificar<strong className='text-violet-500'>Empresa</strong></h1>
        <p className='text-sm text-gray-300'>Confira se uma empresa existe informando o número de CNPJ.</p>
        <div className="flex flex-col gap-2 mt-12">
          <Label>CNPJ da Empresa</Label>
          <Input value={cnpj} onChange={(e) => setCnpj(e.target.value)} className='w-[400px] rounded' type='text' placeholder='Digite o CNPJ...' />
          <Button onClick={findCnpj} className='rounded'>Buscar</Button>
        </div>

        {empresa && <div className="flex flex-col gap-1 mt-12 w-full bg-white/5 p-4 rounded text-white">

          <p>Razão Social: <span className='text-violet-500 font-semibold'>{empresa?.razao_social}</span></p>
          <p>CNPJ: <span className='text-violet-500 font-semibold'>{empresa?.cnpj}</span></p>
          <p>Sócio(a): <span className='text-violet-500 font-semibold'>{empresa?.qsa[0]?.nome_socio}</span></p>
          <p>Sócio(a): <span className='text-violet-500 font-semibold'>{empresa?.qsa[1]?.nome_socio}</span></p>
          <p>Sócio(a): <span className='text-violet-500 font-semibold'>{empresa?.qsa[2]?.nome_socio}</span></p>
          <p>Logradouro: <span className='text-violet-500 font-semibold'>{empresa?.logradouro}</span></p>
          <p>Cidade: <span className='text-violet-500 font-semibold'>{empresa?.municipio} - {empresa?.uf}</span></p>
          <p>Natureza Jurídica: <span className='text-violet-500 font-semibold'>{empresa?.natureza_juridica}</span></p>
          <p>Descrição Fiscal: <span className='text-violet-500 font-semibold'>{empresa?.cnae_fiscal_descricao}</span></p>
          <p>Início das Atividades: <span className='text-violet-500 font-semibold'>{empresa?.data_inicio_atividade}</span></p>
        </div>}

        {empresa && <div className='flex items-center gap-2 mt-10 text-green-500'>
          <BadgeCheck className='text-green-500' /> Empresa Regularizada!
        </div>}

        <Link href='https://github.com/gabrielst03' target='_blank' className='flex flex-col items-center gap-1 mt-20  '>
          <div className='w-12 h-12 flex items-center justify-center rounded bg-slate-800 hover:bg-slate-700 duration-300 text-white'>
            <GithubIcon className='w-8 h-8' />
          </div>
          Gabriel Santana


        </Link>
      </div>
    </main>
  )
}
