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
            name:'Apontamento de produção',
            path:'/dashboard/apontamentos/producao',
            icon:'/producao-icon.svg'
        }]
    },
        {
        name:'Cadastros',
        items:[{
            name:'Cadastro de produto',
            path:'/dashboard/cadastros/produto',
            icon:'/product-icon.svg'
        }]
    }
] 

