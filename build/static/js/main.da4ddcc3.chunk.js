(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{41:function(e,n,t){},42:function(e,n,t){"use strict";t.r(n);var r=t(2),c=t.n(r),a=t(16),o=t.n(a),u=t(3),s=t(0),i=function(e){var n=e.person,t=e.deletePerson;return Object(s.jsxs)("div",{children:[n.name," ",n.number," ",Object(s.jsx)("button",{type:"button",onClick:t,children:"delete"})]})},d=function(e){var n=e.message,t=e.type;return null===n?null:Object(s.jsx)("div",{className:t,children:n})},b=t(7),j=t(4),l=t.n(j),h="/api/persons",f={addPerson:function(e){return l.a.post(h,e).then((function(e){return e.data}))},removePerson:function(e){return l.a.delete("".concat(h,"/").concat(e))},getPersons:function(){return l.a.get(h).then((function(e){return e.data}))},changeNumber:function(e,n){var t=Object(b.a)(Object(b.a)({},e),{},{number:n});return l.a.put("".concat(h,"/").concat(e.id),t).then((function(e){return e.data}))}},m=function(e){return Object(s.jsxs)("form",{onSubmit:e.onSubmit,children:[Object(s.jsx)(v,{label:"name:",handleChange:e.onNameChange,value:e.newName}),Object(s.jsx)(v,{label:"number:",handleChange:e.onNumberChange,value:e.newNumber}),Object(s.jsx)("div",{children:Object(s.jsx)("button",{type:"submit",children:"add"})})]})},v=function(e){var n=e.handleChange,t=e.value,r=e.label;return Object(s.jsxs)("div",{children:[r," ",Object(s.jsx)("input",{type:"text",onChange:n,value:t})]})},O=function(){var e=Object(r.useState)([]),n=Object(u.a)(e,2),t=n[0],c=n[1],a=Object(r.useState)(""),o=Object(u.a)(a,2),b=o[0],j=o[1],l=Object(r.useState)(""),h=Object(u.a)(l,2),O=h[0],p=h[1],g=Object(r.useState)(""),x=Object(u.a)(g,2),w=x[0],C=x[1],y=Object(r.useState)({}),N=Object(u.a)(y,2),S=N[0],P=N[1];Object(r.useEffect)((function(){f.getPersons().then((function(e){return c(e)}))}),[]);var k=function(){j(""),p("")},A=function(e,n){P({content:e,type:n}),setTimeout((function(){return P({})}),5e3)};return Object(s.jsxs)("div",{children:[Object(s.jsx)("h2",{children:"Phonebook"}),Object(s.jsx)(d,{message:S.content,type:S.type}),Object(s.jsx)("div",{children:Object(s.jsx)(v,{label:"filter shown with",value:w,handleChange:function(e){return C(e.target.value)}})}),Object(s.jsx)("h2",{children:"Add new"}),Object(s.jsx)(m,{onSubmit:function(e){e.preventDefault();var n=t.find((function(e){return e.name===b}));if(n)f.changeNumber(n,O).then((function(e){var r=t.map((function(t){return t.id!==n.id?t:e}));c(r),k(),A("Updated ".concat(b),"success")})).catch((function(e){A(e.response.data.error,"danger")}));else{var r={name:b,number:O};f.addPerson(r).then((function(e){c(t.concat(e)),k(),A("Added ".concat(b),"success")})).catch((function(e){A(e.response.data.error,"danger")}))}},onNameChange:function(e){return j(e.target.value)},onNumberChange:function(e){return p(e.target.value)},newName:b,newNumber:O}),Object(s.jsx)("h2",{children:"Numbers"}),t.map((function(e){return e.name.toLowerCase().includes(w.toLowerCase())?Object(s.jsx)(i,{person:e,deletePerson:function(){return n=e.name,r=e.id,void(window.confirm("Are you sure you want to delete ".concat(n,"?"))&&f.removePerson(r).then((function(){var e=t.filter((function(e){return e.id!==r}));c(e),A("Succesfully removed ".concat(n," from server"),"danger")})).catch((function(e){A("Cannot remove ".concat(n,". Was already removed from server."),"danger")})));var n,r}},e.name):null}))]})};t(41);o.a.render(Object(s.jsx)(c.a.StrictMode,{children:Object(s.jsx)(O,{})}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.da4ddcc3.chunk.js.map