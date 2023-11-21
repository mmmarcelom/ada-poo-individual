import { abrir, salvar } from './jsonFunctions'

interface Emprestimo {
    nome: string;
    idade: number;
    cpf: string;
    rg: string;
    sexo: string;
    cidade: string;
    estado: string;
    emprestimo: {
        valorTotal: number;
        valorRequerido: number;
        valorParcela: number;
        numeroParcelas: number;
    };
}

interface EmprestimoAnalisado extends Emprestimo {
    aprovado: boolean
    analise: string []
}

let emprestimos: Emprestimo[] = abrir('solicitacoes.json')
let analisados: EmprestimoAnalisado[] = emprestimos.map((e) => {
    let aprovado = true
    let v: EmprestimoAnalisado = { ...e, aprovado, analise: [] };

    if(e.idade <= 18) 
        v.analise.push('Solicitante não é maior de idade')
    if(e.emprestimo.valorTotal < e.emprestimo.valorRequerido) 
        v.analise.push('Total não é maior que o requerido')
    if(e.emprestimo.valorTotal != e.emprestimo.valorParcela * e.emprestimo.numeroParcelas) 
        v.analise.push('Inconsistência na soma das parcelas')

    if(v.analise.length > 0) v.aprovado = false

    return v
})

let aprovados: EmprestimoAnalisado[] = analisados.filter(e => e.aprovado)

console.log('\nLista de aprovados:')
aprovados.forEach(e => console.log(`- ${e.nome}`))
console.log(`Total: ${aprovados.length} de ${emprestimos.length}`)

salvar('aprovados.json', aprovados)
