/* Creacion de la clase padre y las 2 hijas*/ 
class Dato{
    constructor(descripcion, valor){
        this._descripcion=descripcion;
        this._valor=valor;
    }
    get descripcion(){
        return this._descripcion;
    }
    set descripcion(descripcion){
        this._descripcion=descripcion;
    }
    get valor(){
        return this._valor;
    }
    set valor(valor){
        this._valor=valor;
    }

}

class ingreso extends Dato{
    static contadorIngresos=0;
    constructor(descripcion, valor){
        super(descripcion, valor)
        this._id=++ingreso.contadorIngresos;

    }
    get id(){
        return this._id;
    }  
};

class egreso extends Dato{
    static contadorEgresos=0;
    constructor(descripcion,valor){
        super(descripcion,valor)
        this._id = ++egreso.contadorEgresos
    }
    get id(){
        return this._id;
    }
    
}
/*Creacio de los arreglos de ingreso y egreso*/
const ingresos=[
    new ingreso('Salario', 3500),
    new ingreso('venta de coche', 7000)
];

const egresos=[
    new egreso('Renta deparatamento', 600),
    new egreso('Ropa', 900)
];
let cargarApp=()=>{
    cargarCabecero()
    cargarIngresos()
    cargarEgresos()
}

const totalIngresos = () => {
    let totalIngreso=0;
    for(let ingreso of ingresos){
        totalIngreso+=ingreso._valor;
    } 
    return totalIngreso;
}


const totalEgresos = () => {
    let totalEgreso=0;
    for(let egreso of egresos){
        totalEgreso+=egreso._valor   
    }
    return totalEgreso;
}

let cargarCabecero=()=>{
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso=(totalEgresos()/totalIngresos());
    document.getElementById('presupuesto').innerHTML=formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML=formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML=formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML=formatoMoneda(totalEgresos());

}

const formatoMoneda = (valor)=>{
    return valor.toLocaleString('en-US',{style:'currency', currency:'USD',minimumFractionDigits:2})
}

const formatoPorcentaje=(valor)=>{
    return valor.toLocaleString('en-US',{style:'percent', minimumFractionDigits:2})
}

const cargarIngresos = () => {
    let ingresosHTML='';
    for(let ingreso of ingresos){
        ingresosHTML+=crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML=ingresosHTML;
}

 const crearIngresoHTML=(ingreso)=>{
    let ingresoHtml=`
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${ingreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">${formatoMoneda(ingreso.valor)}</div>
                        <div class="elemento_eliminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close-circle-outline"
                                onclick='eliminarIngreso(${ingreso.id})'></ion-icon>

                            </button>
                        </div>
                    </div>

                </div>`
                return ingresoHtml;

 };

 const eliminarIngreso=(id)=>{
  let indiceEliminar = ingresos.findIndex(ingreso=>ingreso.id ===id)
  ingresos.splice(indiceEliminar,1);
  cargarCabecero();
  cargarIngresos();

 }
 const cargarEgresos=()=>{
    let egresosHTML="";
    for(let egreso of egresos){
        egresosHTML+=crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML=egresosHTML;

 }
 const crearEgresoHTML=(egreso)=>{
    let egresoHTML=`
    <div class="elemento limpiarEstilos">
                    <div class="elemento_descripcion">${egreso.descripcion}</div>
                    <div class="derecha limpiarEstilos">
                        <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
                        <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
                        <div class="elemento_eleminar">
                            <button class="elemento_eliminar--btn">
                                <ion-icon name="close-circle-outline"
                                onclick='eliminarEgreso(${egreso.id})'></ion-icon>
                            </button>
                        
                        </div>
                    </div>
                </div>`
                return egresoHTML;  
 };

 let eliminarEgreso=(id)=>{
    let indiceEliminar = egresos.findIndex(egreso => egreso.id===id)
    console.log(egreso)
    egresos.splice(indiceEliminar,1);
    cargarCabecero();
    cargarEgresos();
 }
 let agregarDato = (event)=>{
    event.preventDefault();
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor']
    
    if(descripcion.value!=" " && valor.value!=" "){
        if(tipo.value=="ingreso"){
            ingresos.push(new ingreso(descripcion.value, +valor.value))
            cargarCabecero();
            cargarIngresos();
            event.preventDefault();
        }
        else if(tipo.value=="egreso"){
            egresos.push(new egreso(descripcion.value, valor.value))
            cargarCabecero();
            cargarEgresos()
    }
    }

 }


