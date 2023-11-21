import * as fs from 'fs'
import * as process from 'process'

export function abrir(arquivo: string){
    try {
        const jsonFilePath = process.cwd() + '\\src\\' + arquivo
        const dados = fs.readFileSync(jsonFilePath, 'utf-8');
        return JSON.parse(dados);
    } catch (err) {
        console.error('Erro ao ler arquivo:', err);
    }
}

export function salvar(arquivo: string, dados: object){
    const jsonFilePath = process.cwd() + '\\src\\' + arquivo
    
    try {
        fs.writeFileSync(jsonFilePath, JSON.stringify(dados), 'utf-8');
        console.log('\nArquivo salvo com sucesso:\n', jsonFilePath);
    } catch (err) {
        console.error('Erro ao criar arquivo:', err);
    }
}