export type TMenuList = TMenuGroup[] ;
export type TMenuItem = {
  path: string;
  icon?: string;
  name: string;
};
export type TMenuGroup = {
  name: string;
  items: TMenuItem[]
};
export const menuList:TMenuList = [
    {
        name:'Apontamentos',
        items:[{
            name:'Produção',
            path:'/dashboard/apontamentos/producao',
            icon:'/producao-icon.svg'
        }]
    },
        {
        name:'Cadastros',
        items:[{
            name:'Produto',
            path:'/dashboard/cadastros/produto',
            icon:'/product-icon.svg'
        }]
    }
] 

