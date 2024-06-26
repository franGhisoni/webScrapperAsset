class Comercio {
    private titulo?              : string    | null = "No indica";
    private precio?              : number    | null = 0;
    private moneda?              : string    | null = "No indica";
    private m2?                  : number    | null = 0;
    private m2Cubiertos?         : number    | null = 0;
    private ubicacion?           : string    | null = "No indica";
    private adicional?           : string    | null = "No indica";
    private descripcion?         : string    | null = "No indica";
    private alternativo?         : string    | null = "No indica";
    private url?                 : string    | null = "No indica";
    private operacion?           : string    | null = "No indica";
    private timeStamp?           : Date      | null = new Date("No indica");
    private precioPorM2?         : number    | null = 0;
    private validacion?          : boolean   | null = null;
    private fechaDePublicacion?  : Date      | null = new Date("No indica");
    private publicador?          : string    | null = "No indica";

    // constructor(titulo: string, precio: number, moneda: string, m2: number, ubicacion: string, adicional: string, descripcion: string, alternativo: string, url: string, servicios: { agua: boolean; luz: boolean; gas: boolean; }, timeStamp: Date, precioPorM2: number, validacion: boolean, fechaDePublicacion: Date, publicador: string) {
    //     this.titulo                 = titulo;
    //     this.precio                 = precio;
    //     this.moneda                 = moneda;
    //     this.m2                     = m2;
    //     this.ubicacion              = ubicacion;
    //     this.adicional              = adicional;
    //     this.descripcion            = descripcion;
    //     this.alternativo            = alternativo;
    //     this.url                    = url;
    //     this.servicios              = servicios;
    //     this.timeStamp              = new Date();
    //     this.precioPorM2            = precioPorM2;
    //     this.validacion             = validacion;
    //     this.fechaDePublicacion     = fechaDePublicacion;
    //     this.publicador             = publicador;
    // }

    constructor(){}
    
    

    getTitulo() {
        return this.titulo;
    }

    getPrecio() {
        return this.precio;
    }

    getMoneda() {
        return this.moneda;
    }

    getM2() {
        return this.m2;
    }
    
    getM2Cubiertos() {
        return this.m2Cubiertos
    }

    getUbicacion() {
        return this.ubicacion;
    }

    getAdicional() {
        return this.adicional;
    }

    getDescripcion() {
        return this.descripcion;
    }

    getAlternativo() {
        return this.alternativo;
    }

    getUrl() {
        return this.url;
    }

    getOperacion() {
        return this.operacion;
    }

    getTimeStamp() {
        return this.timeStamp;
    }

    getPrecioPorM2() {
        return this.precioPorM2;
    }

    getValidacion() {
        return this.validacion;
    }

    getFechaDePublicacion() {
        return this.fechaDePublicacion;
    }

    getPublicador() {
        return this.publicador;
    }

    setTitulo(titulo: string | null) {
        this.titulo = titulo;
    }

    setPrecio(precio: number | null) {
        this.precio = precio;
    }

    setMoneda(moneda: string | null) {
        this.moneda = moneda;
    }

    setM2(m2: number | null) {
        this.m2 = m2;
    }

    setM2Cubiertos(m2Cubiertos: number | null) {
        this.m2Cubiertos = m2Cubiertos;
    }

    setUbicacion(ubicacion: string | null) {
        this.ubicacion = ubicacion;
    }

    setAdicional(adicional: string | null) {
        this.adicional = adicional;
    }

    setDescripcion(descripcion: string | null) {
        this.descripcion = descripcion;
    }

    setAlternativo(alternativo: string | null) {
        this.alternativo = alternativo;
    }

    setUrl(url: string | null) {
        this.url = url;
    }

    setOperacion(operacion : string | null) {
        this.operacion = operacion;
    }

    setTimeStamp(timeStamp: Date) {
        this.timeStamp = timeStamp;
    }

    setPrecioPorM2(precioPorM2: number | null) {
        this.precioPorM2 = precioPorM2;
    }

    setValidacion(validacion:boolean | null) {
        this.validacion = validacion;
    }

    setFechaDePublicacion(fechaDePublicacion: Date | null) {
        this.fechaDePublicacion = fechaDePublicacion;
    }

    setPublicador(publicador: string | null) {
        this.publicador = publicador;
    }
}

export {Comercio}
