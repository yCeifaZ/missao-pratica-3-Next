import styles from '../src/app/page.module.css';
import { useEffect, useState } from 'react';
import LinhaLivro from '../componentes/LinhaLivro';
import Head from 'next/head'
import Menu from '../componentes/Menu'
import Livro from '../classes/modelo/Livro';

const LivroLista: React.FC = () => {
    const baseURL = "http://localhost:3000/api/livros";
    const [livros, setLivros] = useState([]);
    const [carregado, setCarregado] = useState(false);

    const obter = async () => {
        const response = await fetch(baseURL);
        const data = await response.json();
        return data;
    };

    const excluirLivro = async (codigo: number): Promise<boolean> => {
        try {
            const response = await fetch(`${baseURL}/${codigo}`, {
                method: 'DELETE'
            });

            return response.ok;
        } catch (error) {
            console.error('Erro ao excluir livro:', error);
            return false;
        }
    };

    useEffect(() => {
        obter().then(data => {
            setLivros(data);
            setCarregado(true);
        });
    }, [carregado]);

    const handleExcluir = (codigo: number) => {
        excluirLivro(codigo).then((deleted) => {
            if (deleted) {
                setCarregado(false);
            }
        });
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Livro Lista</title>
            </Head>
            <Menu />
            <main style={{ width: '80%', margin: '0 auto', textAlign: 'left' }}>
                <h1>Lista de Livros</h1>
                <table className="table table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th>Título</th>
                            <th>Resumo</th>
                            <th>Editora</th>
                            <th>Autores</th>
                        </tr>
                    </thead>
                    <tbody>
                        {livros.map((livro: Livro) => (
                            <LinhaLivro key={livro.codigo} livro={livro} excluir={() => handleExcluir(livro.codigo)} />
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
};

export default LivroLista;