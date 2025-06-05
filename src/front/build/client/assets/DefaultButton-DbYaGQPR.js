import{j as e}from"./chunk-DQRVZFIR-DcnR91AJ.js";var i=(t=>(t.PRIMARY="primary",t.ACTION="action",t.SECONDARY="secondary",t.ERROR="error",t))(i||{});function b({buttonType:t,onClick:a,children:o,...n}){const r=t||"primary";return e.jsx("div",{className:"",children:e.jsx("button",{...n,className:`${r=="primary"?"bg-[#0A2C35]":r=="secondary"?"bg-amber-50":r=="action"?"bg-[#00161C]":"bg-red-500"}
                    ${r=="secondary"?"text-slate-800":r=="action"?"text-[#F5F5F5]":"text-white"} 
                    ${r=="action"?"w-64 px-4 py-2":"h-16 w-48"} 
                    text-xl font-bold rounded-lg
                    transition-all duration-300
                    ${r=="primary"?"hover:bg-amber-50":r=="secondary"?"hover:bg-[#0A2C35] hover:text-white":r=="action"?"hover:bg-gray-300":"hover:bg-red-700"} 
                    hover:text-slate-800`,onClick:a,children:o})})}export{i as B,b as D};
