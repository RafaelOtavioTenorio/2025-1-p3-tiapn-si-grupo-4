import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { ServerRouter, useMatches, useActionData, useLoaderData, useParams, useRouteError, Meta, Links, ScrollRestoration, Scripts, Outlet, isRouteErrorResponse, Link, BrowserRouter, Routes, Route, useNavigate } from "react-router";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { createElement, useRef, useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Search from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import { ArrowBackIosRounded, AddCircleOutlineRounded, ViewKanbanOutlined, AccessTime, Person } from "@mui/icons-material";
import axios from "axios";
import { redirect, useActionData as useActionData$1, useLocation, Form } from "react-router-dom";
const streamTimeout = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    let userAgent = request.headers.get("user-agent");
    let readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(ServerRouter, { context: routerContext, url: request.url }),
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, streamTimeout + 1e3);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  streamTimeout
}, Symbol.toStringTag, { value: "Module" }));
function withComponentProps(Component) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      matches: useMatches()
    };
    return createElement(Component, props);
  };
}
function withErrorBoundaryProps(ErrorBoundary3) {
  return function Wrapped() {
    const props = {
      params: useParams(),
      loaderData: useLoaderData(),
      actionData: useActionData(),
      error: useRouteError()
    };
    return createElement(ErrorBoundary3, props);
  };
}
const links = () => [{
  rel: "preconnect",
  href: "https://fonts.googleapis.com"
}, {
  rel: "preconnect",
  href: "https://fonts.gstatic.com",
  crossOrigin: "anonymous"
}, {
  rel: "stylesheet",
  href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
}];
function Layout({
  children
}) {
  return /* @__PURE__ */ jsxs("html", {
    lang: "en",
    children: [/* @__PURE__ */ jsxs("head", {
      children: [/* @__PURE__ */ jsx("meta", {
        charSet: "utf-8"
      }), /* @__PURE__ */ jsx("meta", {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      }), /* @__PURE__ */ jsx(Meta, {}), /* @__PURE__ */ jsx(Links, {})]
    }), /* @__PURE__ */ jsxs("body", {
      children: [children, /* @__PURE__ */ jsx(ScrollRestoration, {}), /* @__PURE__ */ jsx(Scripts, {})]
    })]
  });
}
const Pannels$1 = {
  CREATE: "",
  ROUTINES: "routines",
  HISTORIC: "historic",
  GROUPS: "groups"
};
const root = withComponentProps(function App() {
  return /* @__PURE__ */ jsx(Outlet, {});
});
const ErrorBoundary = withErrorBoundaryProps(function ErrorBoundary2({
  error
}) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack;
  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  }
  return /* @__PURE__ */ jsxs("main", {
    className: "pt-16 p-4 container mx-auto",
    children: [/* @__PURE__ */ jsx("h1", {
      children: message
    }), /* @__PURE__ */ jsx("p", {
      children: details
    }), stack]
  });
});
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  Pannels: Pannels$1,
  default: root,
  links
}, Symbol.toStringTag, { value: "Module" }));
function Title(props) {
  return /* @__PURE__ */ jsx("p", { className: "text-[#0A2C35] text-4xl font-bold  ", children: props.children });
}
function MainPage(props) {
  return /* @__PURE__ */ jsx("div", { className: "flex flex-row m-5 p-4 mb-16", children: /* @__PURE__ */ jsxs("div", { className: "flex-1 bg-gray-100", children: [
    /* @__PURE__ */ jsx("div", { className: "flex flex-row justify-between items-center", children: /* @__PURE__ */ jsx(Title, { children: props.title }) }),
    /* @__PURE__ */ jsx("div", { className: "bg-white w-full min-h-[90vh] mt-4 rounded-lg shadow-md", children: props.children })
  ] }) });
}
function Header() {
  return /* @__PURE__ */ jsx("div", { className: "bg-[#0A2C35] justify-between flex items-center p-4", children: /* @__PURE__ */ jsx("p", { className: "mx-auto text-white text-xl font-bold ", children: "ROUTIX" }) });
}
var ButtonTypes = /* @__PURE__ */ ((ButtonTypes2) => {
  ButtonTypes2["PRIMARY"] = "primary";
  ButtonTypes2["ACTION"] = "action";
  ButtonTypes2["SECONDARY"] = "secondary";
  ButtonTypes2["ERROR"] = "error";
  return ButtonTypes2;
})(ButtonTypes || {});
function DefaultButton({ buttonType: type, onClick, children, ...props }) {
  const buttonType = type || "primary";
  return /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(
    "button",
    {
      ...props,
      className: `${buttonType == "primary" ? `bg-[#0A2C35]` : buttonType == "secondary" ? `bg-amber-50` : buttonType == "action" ? `bg-[#00161C]` : `bg-red-500`}
                    ${buttonType == "secondary" ? "text-slate-800" : buttonType == "action" ? "text-[#F5F5F5]" : "text-white"} 
                    ${buttonType == "action" ? "w-64 px-4 py-2" : "h-16 w-48"} 
                    text-xl font-bold rounded-lg
                    transition-all duration-300
                    ${buttonType == "primary" ? `hover:bg-amber-50` : buttonType == "secondary" ? `hover:bg-[#0A2C35] hover:text-white` : buttonType == "action" ? `hover:bg-gray-300` : `hover:bg-red-700`} 
                    hover:text-slate-800`,
      onClick,
      children
    }
  ) });
}
function CreateRoutine(props) {
  const ref = useRef(null);
  const [nome, setNome] = useState("");
  const [descRotina, setDescRotina] = useState("");
  const [prioridade, setPrioridade] = useState("");
  const handleCreate = () => {
    if (nome.trim() === "") return;
    setNome("");
    setPrioridade("1");
    setDescRotina("");
    props.closeModal();
  };
  useEffect(() => {
    var _a, _b;
    if (props.openModal) {
      (_a = ref.current) == null ? void 0 : _a.showModal();
    } else {
      (_b = ref.current) == null ? void 0 : _b.close();
    }
  }, [props.openModal]);
  return /* @__PURE__ */ jsx(
    "dialog",
    {
      ref,
      onCancel: props.closeModal,
      className: "items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg",
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-white p-4 m-4 rounded-lg w-md w-full overflow-auto max-h-[90vh]",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsx("div", { className: "flex-1 flex items-center justify-center", children: props.children }),
            /* @__PURE__ */ jsxs("div", { className: "justify-between flex items-center", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-4", children: "CADASTRAR ROTINA" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: props.closeModal,
                  className: "text-gray-500 hover:text-gray-700 border \n              border-gray-300 rounded-lg p-2 transition-colors \n              duration-150 hover:bg-gray-100 focus:outline-none",
                  "aria-label": "Fechar",
                  type: "button",
                  children: /* @__PURE__ */ jsx(CloseIcon, {})
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pt-4 grid grid-cols-5 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "col-span-4 mb-4", children: [
                /* @__PURE__ */ jsx("label", { className: "block font-medium mb-1", children: "Nome da rotina" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Digite o nome da rotina",
                    value: nome,
                    onChange: (e) => setNome(e.target.value),
                    className: "w-full border p-2 rounded"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsx("label", { className: "block font-medium mb-1", children: "Prioridade" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: prioridade,
                    onChange: (e) => setPrioridade(e.target.value),
                    className: "w-full border p-2 rounded",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "1", children: "1" }),
                      /* @__PURE__ */ jsx("option", { value: "2", children: "2" }),
                      /* @__PURE__ */ jsx("option", { value: "3", children: "3" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "col-span-5 mb-4", children: [
                /* @__PURE__ */ jsx("label", { className: "block font-medium mb-1", children: "Descrição da rotina" }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    maxLength: 255,
                    rows: 4,
                    placeholder: "Digite a descrição do insumo",
                    value: descRotina,
                    onChange: (e) => setDescRotina(e.target.value),
                    className: "w-full border p-2 rounded"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex w-full p-4 justify-center gap-2", children: /* @__PURE__ */ jsx(DefaultButton, { onClick: handleCreate, children: "Criar" }) })
          ]
        }
      )
    }
  );
}
function Delete({ openModal, closeModal, onDelete, nomeRotina }) {
  const ref = useRef(null);
  useEffect(() => {
    var _a, _b;
    if (openModal) {
      (_a = ref.current) == null ? void 0 : _a.showModal();
    } else {
      (_b = ref.current) == null ? void 0 : _b.close();
    }
  }, [openModal]);
  return /* @__PURE__ */ jsx(
    "dialog",
    {
      ref,
      onCancel: closeModal,
      className: "items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg",
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-white p-4 m-4 rounded-lg w-full overflow-auto max-h-[90vh]",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "justify-between flex items-center", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-4", children: "DELETAR ROTINA" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: closeModal,
                  className: "text-gray-500 hover:text-gray-700 border border-gray-300 \n            rounded-md p-2 transition-colors duration-150 hover:bg-gray-100 focus:outline-none",
                  "aria-label": "Fechar",
                  type: "button",
                  children: /* @__PURE__ */ jsx(CloseIcon, {})
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "pt-5 mb-6 text-center", children: [
              "Tem certeza que deseja excluir a rotina? ",
              /* @__PURE__ */ jsx("span", { className: "font-semibold", children: nomeRotina || "selecionada" }),
              "?",
              /* @__PURE__ */ jsx("br", {}),
              "Esta ação não poderá ser desfeita."
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex w-full justify-center gap-4", children: /* @__PURE__ */ jsx(DefaultButton, { onClick: onDelete, children: "Deletar" }) })
          ]
        }
      )
    }
  );
}
function SearchInput(props) {
  const [search, setSearch] = useState("");
  return /* @__PURE__ */ jsxs("div", { className: "relative w-full", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        className: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-500",
        "aria-label": "Pesquisar",
        type: "button",
        tabIndex: -1,
        children: /* @__PURE__ */ jsx(Search, {})
      }
    ),
    /* @__PURE__ */ jsx(
      "input",
      {
        type: "text",
        value: search,
        onChange: (e) => setSearch(e.target.value),
        placeholder: "Pesquisar rotina ...",
        className: "w-full pl-12 pr-4 py-2 rounded shadow-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      }
    )
  ] });
}
function ItemRegister(props) {
  const ref = useRef(null);
  const [tipo, setTipo] = useState("Tarefa");
  const [nome, setNome] = useState("");
  const [prioridade, setPrioridade] = useState("1");
  const [descricao, setDescricao] = useState("");
  const handleCreate = () => {
    if (nome.trim() === "") return;
    if (tipo == "Tarefa") {
      props.onCreate({ tipo, nome, prioridade });
    } else if (tipo == "Insumo") {
      props.onCreate({ tipo, nome, descricao });
    }
    setTipo("Tarefa");
    setNome("");
    setPrioridade("1");
    setDescricao("");
    props.closeModal();
  };
  useEffect(() => {
    var _a, _b;
    if (props.openModal) {
      (_a = ref.current) == null ? void 0 : _a.showModal();
    } else {
      (_b = ref.current) == null ? void 0 : _b.close();
    }
  }, [props.openModal]);
  return /* @__PURE__ */ jsx(
    "dialog",
    {
      ref,
      onCancel: props.closeModal,
      className: "items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg",
      children: /* @__PURE__ */ jsx("div", { className: "modal-overlay", onClick: props.closeModal, children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "bg-white p-4 m-4 rounded-lg w-md w-full overflow-auto max-h-[90vh]",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "justify-between flex items-center", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-4", children: "CADASTRAR ITEM" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: props.closeModal,
                  className: "text-gray-500 hover:text-gray-700 border \n              border-gray-300 rounded-lg p-2 transition-colors \n              duration-150 hover:bg-gray-100 focus:outline-none",
                  "aria-label": "Fechar",
                  type: "button",
                  children: /* @__PURE__ */ jsx(CloseIcon, {})
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pt-4 grid gap-4 grid-cols-5", children: [
              /* @__PURE__ */ jsxs("div", { className: "col-span-4 mb-4", children: [
                /* @__PURE__ */ jsx("label", { className: "block font-medium mb-1", children: "Tipo" }),
                /* @__PURE__ */ jsxs(
                  "select",
                  {
                    value: tipo,
                    onChange: (e) => setTipo(e.target.value),
                    className: "w-full border p-2 rounded",
                    children: [
                      /* @__PURE__ */ jsx("option", { value: "Tarefa", children: "Tarefa" }),
                      /* @__PURE__ */ jsx("option", { value: "Insumo", children: "Insumo" })
                    ]
                  }
                )
              ] }),
              tipo === "Tarefa" && /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                  /* @__PURE__ */ jsx("label", { className: "block font-medium mb-1", children: "Prioridade" }),
                  /* @__PURE__ */ jsxs(
                    "select",
                    {
                      value: prioridade,
                      onChange: (e) => setPrioridade(e.target.value),
                      className: "w-full border p-2 rounded",
                      children: [
                        /* @__PURE__ */ jsx("option", { value: "1", children: "1" }),
                        /* @__PURE__ */ jsx("option", { value: "2", children: "2" }),
                        /* @__PURE__ */ jsx("option", { value: "3", children: "3" }),
                        /* @__PURE__ */ jsx("option", { value: "4", children: "4" }),
                        /* @__PURE__ */ jsx("option", { value: "5", children: "5" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "col-span-5 mb-4", children: [
                  /* @__PURE__ */ jsx("label", { className: "block font-medium mb-1", children: "Nome da tarefa" }),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      placeholder: "Digite o nome da tarefa",
                      value: nome,
                      onChange: (e) => setNome(e.target.value),
                      className: "w-full border p-2 rounded"
                    }
                  )
                ] })
              ] })
            ] }),
            tipo === "Insumo" && /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsx("label", { className: "block font-medium mb-1", children: "Nome do insumo" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Digite o nome do insumo",
                    value: nome,
                    onChange: (e) => setNome(e.target.value),
                    className: "w-full border p-2 rounded"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
                /* @__PURE__ */ jsx("label", { className: "block font-medium mb-1", children: "Descrição do insumo" }),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    maxLength: 255,
                    rows: 4,
                    placeholder: "Digite a descrição do insumo",
                    value: descricao,
                    onChange: (e) => setDescricao(e.target.value),
                    className: "w-full border p-2 rounded"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex w-full p-4 justify-center gap-2", children: [
              props.actions && props.actions.map((action, index) => /* @__PURE__ */ jsx("div", { children: action }, index)),
              /* @__PURE__ */ jsx(DefaultButton, { onClick: handleCreate, children: "Criar" })
            ] })
          ]
        }
      ) })
    }
  );
}
function RoutinesPage() {
  const [createModal, setModal] = useState(false);
  const [searchText, setSearchText] = useState("");
  const rotinas = [
    { nome: "Auditoria Interna", tarefas: 3, insumos: 5 },
    { nome: "Controle de inventário", tarefas: 4, insumos: 1 },
    { nome: "Gerenciar recursos", tarefas: 3, insumos: 5 },
    { nome: "Auditoria Interna", tarefas: 3, insumos: 5 }
  ];
  const tarefas = new Array(7).fill("Coletar dados");
  const [itemRegisterOpen, setItemRegisterOpen] = useState(false);
  const [deleteRotinaOpen, setDeleteRotinaOpen] = useState(false);
  const [resultadoModalRegistroItem, setResultadoModalRegistroItem] = useState();
  const handleCreateItem = () => {
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col p-8 bg-gray-200 min-h-screen", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mb-6", children: [
      /* @__PURE__ */ jsx(Title, { children: "Minhas Rotinas" }),
      /* @__PURE__ */ jsx(DefaultButton, { onClick: () => setModal(true), children: "+ CRIAR ROTINA" }),
      /* @__PURE__ */ jsx(CreateRoutine, { closeModal: () => setModal(false), openModal: createModal })
    ] }),
    /* @__PURE__ */ jsx(SearchInput, { value: searchText, onChange: (e) => setSearchText(e.target.value) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-row p-4 gap-6 w-full max-w-[1200px] mx-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-4 flex-1 max-h-[75vh] overflow-y-auto pr-2", children: rotinas.map((rotina, i) => /* @__PURE__ */ jsxs(
        "div",
        {
          className: `bg-white rounded-lg p-4 shadow-md hover:bg-gray-100 ${i === 0 ? "bg-blue-100" : ""}`,
          children: [
            /* @__PURE__ */ jsx("h2", { className: "font-semibold", children: rotina.nome }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-600", children: [
              rotina.tarefas,
              " tarefas • ",
              rotina.insumos,
              " insumos"
            ] })
          ]
        },
        i
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "bg-white flex-1 rounded-lg p-6 shadow-md", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-start", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "Auditoria Interna" }),
          /* @__PURE__ */ jsx("button", { onClick: () => setDeleteRotinaOpen(true), className: "text-red-600 border border-red-600 px-2 py-1 rounded hover:bg-red-100", children: /* @__PURE__ */ jsx(DeleteIcon, {}) }),
          /* @__PURE__ */ jsx(
            Delete,
            {
              openModal: deleteRotinaOpen,
              closeModal: () => setDeleteRotinaOpen(false),
              onDelete: () => {
              }
            }
          )
        ] }),
        /* @__PURE__ */ jsx(DefaultButton, { onClick: () => setItemRegisterOpen(true), children: "ADICIONAR TAREFA" }),
        /* @__PURE__ */ jsx(
          ItemRegister,
          {
            closeModal: () => setItemRegisterOpen(false),
            openModal: itemRegisterOpen,
            onCreate: handleCreateItem
          }
        ),
        /* @__PURE__ */ jsx("ul", { className: "mt-6 space-y-3", children: tarefas.map((tarefa, i) => /* @__PURE__ */ jsxs("li", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("input", { type: "checkbox" }),
            /* @__PURE__ */ jsx("span", { children: tarefa })
          ] }),
          /* @__PURE__ */ jsx("span", { children: "⚙️" }),
          " "
        ] }, i)) })
      ] })
    ] })
  ] });
}
function HistoricPage() {
  return /* @__PURE__ */ jsx(MainPage, { title: "Histórico", children: /* @__PURE__ */ jsx(DefaultButton, { children: "TESTE" }) });
}
function DefaultModal(props) {
  const ref = useRef(null);
  useEffect(() => {
    var _a, _b;
    if (props.openModal) {
      (_a = ref.current) == null ? void 0 : _a.showModal();
    } else {
      (_b = ref.current) == null ? void 0 : _b.close();
    }
  }, [props.openModal]);
  return /* @__PURE__ */ jsx(
    "dialog",
    {
      ref,
      onCancel: props.closeModal,
      className: "items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-4/5",
      children: /* @__PURE__ */ jsxs("div", { className: "h-full flex flex-col", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-1 flex items-center justify-center", children: props.children }),
        /* @__PURE__ */ jsxs("div", { className: "flex w-full p-4 justify-center gap-2", children: [
          props.actions && props.actions.map((action, index) => /* @__PURE__ */ jsx("div", { children: action }, index)),
          /* @__PURE__ */ jsx(DefaultButton, { onClick: props.closeModal, children: "Fechar" })
        ] })
      ] })
    }
  );
}
function okAction(setModal) {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(DefaultButton, { onClick: () => {
    setModal(false);
  }, buttonType: ButtonTypes.SECONDARY, children: "OK" }) });
}
function GroupsPage() {
  const [modal, setModal] = useState(false);
  return /* @__PURE__ */ jsxs(MainPage, { title: "Gerenciar Grupos", children: [
    /* @__PURE__ */ jsx(DefaultButton, { onClick: () => setModal(true), children: "CRIAR GRUPO" }),
    /* @__PURE__ */ jsx(
      DefaultModal,
      {
        closeModal: () => setModal(false),
        openModal: modal,
        actions: [okAction(() => setModal(false))],
        children: "Modal Content"
      }
    )
  ] });
}
function SidePannel(props) {
  if (props.activePannel == void 0) {
    props.activePannel = "create";
  }
  const [open2, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open2);
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: `${open2 ? "w-1/5" : "w-16"} bg-[#1A4855] min-h-screen max-h-screen h-screen flex flex-col transition-all duration-300  `, onMouseEnter: () => setOpen(true), onMouseLeave: () => setOpen(false), children: [
    /* @__PURE__ */ jsx("div", { className: `flex flex-row items-center ${open2 ? `justify-end` : `justify-center`} m-5`, children: /* @__PURE__ */ jsx(
      "span",
      {
        className: "rounded-full m-5",
        onClick: handleClick,
        children: /* @__PURE__ */ jsx(ArrowBackIosRounded, { className: `text-[#F5F5F5] transform ${open2 ? "" : "rotate-180"} transition-transform duration-300` })
      }
    ) }),
    /* @__PURE__ */ jsx(SidePannelRow, { icon: AddCircleOutlineRounded, open: open2, text: "Criar", pannel: Pannels$1.CREATE, active: props.activePannel == Pannels$1.CREATE, setActivePannel: props.setActivePannel }),
    /* @__PURE__ */ jsx(SidePannelRow, { icon: ViewKanbanOutlined, open: open2, text: "Rotinas", pannel: Pannels$1.ROUTINES, active: props.activePannel == "routines", setActivePannel: props.setActivePannel }),
    /* @__PURE__ */ jsx(SidePannelRow, { icon: AccessTime, open: open2, text: "Historico", pannel: Pannels$1.HISTORIC, active: props.activePannel == "historic", setActivePannel: props.setActivePannel }),
    /* @__PURE__ */ jsx(SidePannelRow, { icon: Person, open: open2, text: "Grupos", pannel: Pannels$1.GROUPS, active: props.activePannel == "groups", setActivePannel: props.setActivePannel })
  ] }) });
}
function SidePannelRow(props) {
  return /* @__PURE__ */ jsxs(Link, { to: "/" + props.pannel, onClick: () => {
    props.setActivePannel(props.pannel);
  }, className: `flex flex-row items-center ${props.open ? `justify-start` : `justify-center`} m-5 p-3 ${props.open && props.active ? "border border-[#235563]  rounded-lg bg-[#235563]" : ""}`, children: [
    /* @__PURE__ */ jsx("span", { className: `${!open && "mx-auto"}`, children: /* @__PURE__ */ jsx("span", { color: "#0A2C35", className: "bg-[#F5F5F5] p-2 rounded-[100px] ", children: /* @__PURE__ */ jsx(props.icon, { className: "fontSizeLarge" }) }) }),
    /* @__PURE__ */ jsx("span", { className: `text-white text-xl p-3 ${props.open ? "block" : "hidden"}`, children: props.text[0].toUpperCase() + props.text.substring(1) })
  ] });
}
const Pannels = {
  CREATE: "",
  ROUTINES: "routines",
  HISTORIC: "historic",
  GROUPS: "groups"
};
function meta({}) {
  return [{
    title: "ROUTIX"
  }, {
    name: "description",
    content: "Welcome to React Router!"
  }];
}
const home = withComponentProps(function() {
  const [activePannel, setActivePannel] = useState(Pannels.CREATE);
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsxs("div", {
      className: "h-screen overflow-hidden",
      children: [/* @__PURE__ */ jsx(Header, {}), /* @__PURE__ */ jsx("div", {
        className: "flex flex-row h-[calc(100vh-4rem)]",
        children: /* @__PURE__ */ jsx(BrowserRouter, {
          children: /* @__PURE__ */ jsx(Routes, {
            children: /* @__PURE__ */ jsx(Route, {
              path: "/app/*",
              element: /* @__PURE__ */ jsxs(Fragment, {
                children: [/* @__PURE__ */ jsx(SidePannel, {
                  activePannel,
                  setActivePannel
                }), /* @__PURE__ */ jsx("main", {
                  className: "flex-1 bg-[#F5F5F5] ",
                  children: /* @__PURE__ */ jsxs(Routes, {
                    children: [/* @__PURE__ */ jsx(Route, {
                      path: "/",
                      element: /* @__PURE__ */ jsx(RoutinesPage, {})
                    }), /* @__PURE__ */ jsx(Route, {
                      path: "routines",
                      element: /* @__PURE__ */ jsx(RoutinesPage, {})
                    }), /* @__PURE__ */ jsx(Route, {
                      path: "historic",
                      element: /* @__PURE__ */ jsx(HistoricPage, {})
                    }), /* @__PURE__ */ jsx(Route, {
                      path: "groups",
                      element: /* @__PURE__ */ jsx(GroupsPage, {})
                    })]
                  })
                })]
              })
            })
          })
        })
      })]
    })
  });
});
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Pannels,
  default: home,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const Bg1 = "/assets/bg-01-BAB7PfgL.png";
const Bg2 = "/assets/bg-02-C0MckfbV.png";
const Bg3 = "/assets/bg-03-DKE7Wlu1.png";
const Bg4 = "/assets/bg-04-9_ZclYAH.png";
const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  // Ex: 'http://localhost:3000/api'
  headers: {
    "Content-Type": "application/json"
  }
});
console.log("http://localhost:3000");
console.log(apiClient.defaults);
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Não autorizado! Redirecionando para login...");
      localStorage.removeItem("authToken");
    }
    return Promise.reject(error);
  }
);
const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post("/auth/login", credentials);
    if (response.data.token) {
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userData", JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    console.error("Erro no login:", error);
    throw error;
  }
};
const ErrorMessage = (props) => {
  const [bounce, setBounce] = useState(true);
  setInterval(() => {
    setBounce(false);
  }, 500);
  return /* @__PURE__ */ jsx(Fragment, { children: props.message && /* @__PURE__ */ jsx(
    "div",
    {
      className: `mt-4 text-red-500 text-sm text-center ${bounce ? "animate-wiggle" : ""}`,
      children: props.message
    },
    props.key
  ) });
};
const Login = ({ toggle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [errorKey, setErrorKey] = useState(0);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    var _a, _b;
    event.preventDefault();
    try {
      await loginUser({ Login: email, Senha: password });
      navigate("/");
    } catch (err) {
      const errorMessage = ((_b = (_a = err.response) == null ? void 0 : _a.data) == null ? void 0 : _b.message) || "Falha no login. Tente novamente.";
      setError(errorMessage);
      setErrorKey((prevKey) => prevKey + 1);
      console.error(err);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex w-full h-full bg-[#0A2C35]", children: [
    " ",
    /* @__PURE__ */ jsx("form", { onSubmit: handleSubmit, className: "w-full flex flex-col items-center justify-center", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-left", children: [
      " ",
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-white mb-6", children: "Entrar" }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Email",
          value: email,
          onChange: (e) => setEmail(e.target.value ?? ""),
          className: "mb-4 p-2 rounded-md w-64 bg-[#F5F5F5] text-[#0A2C35] focus:outline-none focus:ring-2 focus:ring-[#00161C] transition-colors duration-300",
          required: true
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "password",
          placeholder: "Senha",
          value: password,
          onChange: (e) => setPassword(e.target.value ?? ""),
          className: "mb-8 p-2 rounded-md w-64 bg-[#F5F5F5] text-[#0A2C35] focus:outline-none focus:ring-2 focus:ring-[#00161C] transition-colors duration-300",
          required: true
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          className: "bg-[#00161C] text-[#F5F5F5] text-xl font-bold w-64 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-300",
          children: "ENTRAR"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: toggle,
          className: "bg-[#F5F5F5] mt-4 text-[#0A2C35] px-4 py-2 text-xl font-bold w-64 rounded-md hover:bg-gray-300 transition-colors duration-300",
          children: "CADASTRAR"
        }
      ),
      /* @__PURE__ */ jsx("a", { href: "#", className: "text-[#F5F5F5] text-sm text-center mt-6 hover:underline", children: "esqueceu a senha?" }),
      /* @__PURE__ */ jsx(ErrorMessage, { message: error }, errorKey)
    ] }) })
  ] });
};
const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!email || !name) {
      alert("Por favor, preencha todos os campos");
      return;
    }
    navigate("/signup", {
      state: { email, name }
    });
  };
  return /* @__PURE__ */ jsx("div", { className: "flex top-1/4 items-center w-full h-full bg-[#0A2C35]", children: /* @__PURE__ */ jsx(
    "form",
    {
      onSubmit: onFormSubmit,
      className: "w-full h-full flex items-center justify-center",
      children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-left", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-4xl font-bold text-white mb-6 ", children: "Cadastrar" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "email",
            placeholder: "Email",
            value: email,
            required: true,
            onChange: (e) => setEmail(e.target.value),
            className: "mb-4 p-2 rounded-md w-64 bg-[#F5F5F5] text-[#0A2C35] focus:outline-none focus:ring-2 focus:ring-[#00161C] transition-colors duration-300"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            value: name,
            required: true,
            onChange: (e) => setName(e.target.value),
            placeholder: "Nome",
            className: "mb-8 p-2 rounded-md w-64 bg-[#F5F5F5] text-[#0A2C35] focus:outline-none focus:ring-2 focus:ring-[#00161C] transition-colors duration-300"
          }
        ),
        /* @__PURE__ */ jsx(
          DefaultButton,
          {
            buttonType: ButtonTypes.ACTION,
            type: "submit",
            children: "CADASTRAR"
          }
        ),
        /* @__PURE__ */ jsx("a", { href: "#", onClick: props.toggle, className: "text-[#F5F5F5] text-sm text-center mt-6 hover:underline", children: "ja tenho uma conta." })
      ] })
    }
  ) });
};
const login = withComponentProps(function() {
  const [isLogon, setLogon] = useState(false);
  const toggleLogon = (e) => {
    e.preventDefault();
    setLogon((prev) => !prev);
  };
  return /* @__PURE__ */ jsxs("main", {
    className: "flex w-full flex-row h-screen overflow-hidden relative bg-[#D9D9D9]",
    children: [/* @__PURE__ */ jsxs("div", {
      className: "absolute w-full h-full",
      children: [/* @__PURE__ */ jsx("img", {
        src: Bg1,
        alt: "Audit",
        className: "absolute bottom-10 left-0 scale-150 border-[#0A2C35] z-10"
      }), /* @__PURE__ */ jsx("img", {
        src: Bg2,
        alt: "Audit",
        className: "absolute bottom-10 right-1/2 -translate-x-14 scale-130 border-[#0A2C35] z-10"
      }), /* @__PURE__ */ jsx("img", {
        src: Bg3,
        alt: "Audit",
        className: "absolute bottom-10 left-1/2 translate-x-5 scale-120 border-[#0A2C35] z-20"
      }), /* @__PURE__ */ jsx("img", {
        src: Bg4,
        alt: "Audit",
        className: "absolute bottom-10 right-0 scale-120 translate-x-10 border-solid border-[#0A2C35] z-20"
      }), /* @__PURE__ */ jsxs("div", {
        className: "absolute right-32 top-1/4 -translate-y-1/2 z-30 transition-opacity duration-700 ease-in-out",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-4xl font-bold text-[#0A2C35] max-w-md mb-6",
          children: "GERENCIE ROTINAS E TAREFAS DA SUA EMPRESA"
        }), /* @__PURE__ */ jsxs("p", {
          className: "text-xl text-[#0A2C35] opacity-80 max-w-sm leading-relaxed",
          children: ["Crie e tenha ", /* @__PURE__ */ jsx("span", {
            className: "font-bold",
            children: "controle"
          }), " de suas rotinas,", /* @__PURE__ */ jsx("span", {
            className: "font-bold",
            children: " gerencie"
          }), " insumos,", /* @__PURE__ */ jsx("span", {
            className: "font-bold",
            children: " otimize"
          }), " processos e muito mais."]
        })]
      }), /* @__PURE__ */ jsxs("div", {
        className: "absolute left-32 top-1/4 -translate-y-1/2 z-30 transition-opacity duration-700 ease-in-out",
        children: [/* @__PURE__ */ jsx("h1", {
          className: "text-4xl font-bold text-[#0A2C35] max-w-md mb-6",
          children: "SISTEMA INTELIGENTE"
        }), /* @__PURE__ */ jsx("p", {
          className: "text-xl text-[#0A2C35] opacity-80 max-w-sm leading-relaxed",
          children: "Elimine processos manuais e aumente a eficiência."
        })]
      })]
    }), /* @__PURE__ */ jsx("div", {
      className: "flex w-full h-full relative z-50",
      children: /* @__PURE__ */ jsx("div", {
        className: `flex w-1/2 h-full bg-gray-200 transition-all duration-700 ease-in-out ${isLogon ? "translate-x-full" : "translate-x-0"}`,
        children: !isLogon ? /* @__PURE__ */ jsx(Login, {
          toggle: toggleLogon
        }) : /* @__PURE__ */ jsx(Signup, {
          toggle: () => toggleLogon(new MouseEvent("click"))
        })
      })
    })]
  });
});
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: login
}, Symbol.toStringTag, { value: "Module" }));
function maskCPF(value) {
  const cleanValue = value.replace(/\D/g, "");
  let maskedValue = cleanValue;
  if (maskedValue.length > 3) {
    maskedValue = maskedValue.replace(/(\d{3})(\d)/, "$1.$2");
  }
  if (maskedValue.length > 7) {
    maskedValue = maskedValue.replace(/(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
  }
  if (maskedValue.length > 11) {
    maskedValue = maskedValue.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d{1,2})$/, "$1.$2.$3-$4");
  }
  return maskedValue.slice(0, 14);
}
async function completeSignUpAction({
  request
}) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const cpf = formData.get("cpf");
  const fieldErrors = {};
  if (!name) fieldErrors.name = "Nome é obrigatório.";
  if (!email) {
    fieldErrors.email = "Email é obrigatório.";
  } else if (!/\S+@\S+\.\S+/.test(email)) {
    fieldErrors.email = "Formato de email inválido.";
  }
  if (!password) fieldErrors.password = "Senha é obrigatória.";
  if (!confirmPassword) fieldErrors.confirmPassword = "Confirmação de senha é obrigatória.";
  if (password && confirmPassword && password !== confirmPassword) {
    fieldErrors.confirmPassword = "As senhas não coincidem.";
  }
  if (!cpf) {
    fieldErrors.cpf = "CPF é obrigatório.";
  }
  if (Object.keys(fieldErrors).length > 0) {
    return {
      fieldErrors
    };
  }
  console.log("Dados para completar cadastro:", {
    name,
    email,
    password,
    cpf
  });
  return redirect("/");
}
const CompleteSignUpFormComponent = () => {
  var _a, _b, _c, _d, _e;
  const actionData = useActionData$1();
  const [cpf, setCpf] = useState("");
  const location = useLocation();
  const {
    email: stateEmail,
    name: stateName
  } = location.state || {};
  useEffect(() => {
    if (actionData == null ? void 0 : actionData.error) {
      alert(actionData.error);
    }
  }, [actionData]);
  return /* @__PURE__ */ jsxs("div", {
    className: "min-h-screen bg-gray-200 flex flex-col",
    children: [/* @__PURE__ */ jsx("header", {
      className: "w-full bg-[#0A2C35] py-4",
      children: /* @__PURE__ */ jsx("h1", {
        className: "text-2xl font-bold text-white text-center",
        children: "ROUTIX"
      })
    }), /* @__PURE__ */ jsx("main", {
      className: "flex flex-grow items-center justify-center p-4",
      children: /* @__PURE__ */ jsxs("div", {
        className: "bg-gray-200 p-8 rounded-lg shadow-md w-full max-w-md",
        children: [/* @__PURE__ */ jsx("h2", {
          className: "text-3xl font-bold text-gray-800 text-center mb-8",
          children: "Completar cadastro"
        }), /* @__PURE__ */ jsxs(Form, {
          method: "post",
          className: "space-y-6",
          children: [/* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("input", {
              type: "text",
              name: "name",
              placeholder: "Nome",
              required: true,
              className: "mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00161C] focus:border-[#00161C] sm:text-sm text-gray-700"
            }), ((_a = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _a.name) && /* @__PURE__ */ jsx("p", {
              className: "text-red-500 text-xs mt-1",
              children: actionData.fieldErrors.name
            })]
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("input", {
              type: "email",
              name: "email",
              placeholder: "Email",
              required: true,
              className: "mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00161C] focus:border-[#00161C] sm:text-sm text-gray-700"
            }), ((_b = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _b.email) && /* @__PURE__ */ jsx("p", {
              className: "text-red-500 text-xs mt-1",
              children: actionData.fieldErrors.email
            })]
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("input", {
              type: "password",
              name: "password",
              placeholder: "Senha",
              required: true,
              className: "mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00161C] focus:border-[#00161C] sm:text-sm text-gray-700"
            }), ((_c = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _c.password) && /* @__PURE__ */ jsx("p", {
              className: "text-red-500 text-xs mt-1",
              children: actionData.fieldErrors.password
            })]
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("input", {
              type: "password",
              name: "confirmPassword",
              placeholder: "Confirmar senha",
              required: true,
              className: "mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00161C] focus:border-[#00161C] sm:text-sm text-gray-700"
            }), ((_d = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _d.confirmPassword) && /* @__PURE__ */ jsx("p", {
              className: "text-red-500 text-xs mt-1",
              children: actionData.fieldErrors.confirmPassword
            })]
          }), /* @__PURE__ */ jsxs("div", {
            children: [/* @__PURE__ */ jsx("input", {
              type: "text",
              name: "cpf",
              placeholder: "CPF",
              onChange: (e) => setCpf(maskCPF(e.target.value)),
              maxLength: 14,
              required: true,
              className: "mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#00161C] focus:border-[#00161C] sm:text-sm text-gray-700"
            }), ((_e = actionData == null ? void 0 : actionData.fieldErrors) == null ? void 0 : _e.cpf) && /* @__PURE__ */ jsx("p", {
              className: "text-red-500 text-xs mt-1",
              children: actionData.fieldErrors.cpf
            })]
          }), /* @__PURE__ */ jsx("div", {
            children: /* @__PURE__ */ jsx("button", {
              type: "submit",
              className: "w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0A2C35] hover:bg-[#00161C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00161C] transition-colors duration-300",
              children: "FINALIZAR"
            })
          })]
        })]
      })
    })]
  });
};
const signup = withComponentProps(CompleteSignUpFormComponent);
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  completeSignUpAction,
  default: signup
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-B5qR1gCf.js", "imports": ["/assets/chunk-DQRVZFIR-DcnR91AJ.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": true, "module": "/assets/root-DamWAstk.js", "imports": ["/assets/chunk-DQRVZFIR-DcnR91AJ.js", "/assets/root-h-3hxtU-.js", "/assets/with-props-g7Gm1Pvl.js"], "css": ["/assets/root-B92113fO.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/home": { "id": "routes/home", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/home-Covgw9o6.js", "imports": ["/assets/with-props-g7Gm1Pvl.js", "/assets/chunk-DQRVZFIR-DcnR91AJ.js", "/assets/DefaultButton-DbYaGQPR.js", "/assets/root-h-3hxtU-.js"], "css": ["/assets/root-B92113fO.css"], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/login": { "id": "routes/login", "parentId": "root", "path": "login", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/login-DLv4_5Sc.js", "imports": ["/assets/with-props-g7Gm1Pvl.js", "/assets/chunk-DQRVZFIR-DcnR91AJ.js", "/assets/DefaultButton-DbYaGQPR.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 }, "routes/signup": { "id": "routes/signup", "parentId": "root", "path": "signup", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasClientMiddleware": false, "hasErrorBoundary": false, "module": "/assets/signup-1htRrv1h.js", "imports": ["/assets/with-props-g7Gm1Pvl.js", "/assets/chunk-DQRVZFIR-DcnR91AJ.js"], "css": [], "clientActionModule": void 0, "clientLoaderModule": void 0, "clientMiddlewareModule": void 0, "hydrateFallbackModule": void 0 } }, "url": "/assets/manifest-36e6477a.js", "version": "36e6477a", "sri": void 0 };
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "unstable_middleware": false, "unstable_optimizeDeps": false, "unstable_splitRouteModules": false, "unstable_subResourceIntegrity": false, "unstable_viteEnvironmentApi": false };
const ssr = true;
const isSpaMode = false;
const prerender = [];
const routeDiscovery = { "mode": "lazy", "manifestPath": "/__manifest" };
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/home": {
    id: "routes/home",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  },
  "routes/signup": {
    id: "routes/signup",
    parentId: "root",
    path: "signup",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  prerender,
  publicPath,
  routeDiscovery,
  routes,
  ssr
};
