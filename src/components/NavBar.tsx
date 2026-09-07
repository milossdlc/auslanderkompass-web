import { Icon } from "./Icon";
import type { View } from "../types";
import { STRINGS } from "../i18n";
import type { Lang } from "../types";

export function NavBar({ active, lang, onNav }: { active: View | null; lang: Lang; onNav: (view: View) => void }) {
  const S=STRINGS[lang], de=lang==="de";
  const items:{id:View;label:string;icon:"compass"|"calendar"|"book"|"passport"}[]=[
    {id:"kompas",label:de?"Heute":S.nav.kompas,icon:"compass"},
    {id:"rokovi",label:S.nav.rokovi,icon:"calendar"},
    {id:"objasnjeno",label:de?"Wissen":(lang==="en"?"Knowledge":S.nav.objasnjeno),icon:"book"},
    {id:"profile",label:de?"Profil":"Profile",icon:"passport"},
  ];
  return <nav className="navbar" aria-label="Primary navigation"><div className="desktop-brand"><div className="brand-mark"><Icon name="compass" size={22}/></div><strong className="disp">Ausländerleben</strong></div>{items.map(it=><button key={it.id} className={"navitem"+(active===it.id?" active":"")} onClick={()=>onNav(it.id)}><Icon name={it.icon} size={21}/><span>{it.label}</span></button>)}</nav>;
}
