import { Html, Head, Main, NextScript } from 'next/document'
import { ToastContainer } from 'react-toastify'


export default function Document() {
  return (
    <Html lang="pt-BR">
      <Head>
        <title>VerificarEmpresa - Verificador de CNPJ</title>
      </Head>
      <body className='bg-slate-900'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
