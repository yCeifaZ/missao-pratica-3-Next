import { NextApiRequest, NextApiResponse } from 'next';
import { controleLivro } from './index';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'DELETE') {
        try {
            const codigo = Number(req.query.codigo);

            if (isNaN(codigo)) {
                return res.status(400).json({ message: 'Código de livro inválido' });
            }

            controleLivro.excluir(codigo);

            res.status(200).json({ message: 'Livro excluído com sucesso' });
        
        } catch (error) {
            res.status(500).json({ message: 'Erro no servidor' });
        }
    } else {
        res.status(405).json({ error: 'Método não permitido' });
    }
};