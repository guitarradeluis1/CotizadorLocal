window.onload = function () {
    obj.init();
    guardar.init();
    console.log("Desarrollador:", "guitarradeluis@gmail.com");
}
//------------------------------------------------------------------------------------
var obj = {
    id: "",
    data: {
        info: {
            cotizacion: "",
            iva: "",
            dias_vencimiento: "15",
            fecha: "",
            fecha_vencimiento: "",
            nombre: "",
            nit: "",
            direcion: "",
            marca: "",
            ciudad: "",
            serial: "",
            correo: "",
            horas: "",
            telefonos: "",
        }, items: []
    },
    init: () => {
        //document.getElementById("tabla-container").innerHTML = "";
        //obj.generarTabla();
        obj.calcular();
        document.getElementById("cotizacion").value = obj.generateUniqueId();
    },
    imprimirBase: () => {
        document.querySelectorAll('.ocultar').forEach(element => {
            element.style.display = 'none';
        });
        obj.inputText();
        window.print();
    },
    mostrar: () => {
        document.querySelectorAll('.ocultar').forEach(element => {
            element.style.display = '';
        });
        obj.textInput();
    },
    calcular: () => {
        var fechaYHora = new Date();
        var dias_vencimiento = parseInt(document.getElementById("dias_vencimiento").value);
        obj.data.info.fecha = guardar.fechaFormato(fechaYHora);
        obj.data.info.fecha_vencimiento = guardar.sumarDias(fechaYHora, dias_vencimiento);
        document.getElementById('fecha').innerHTML = obj.data.info.fecha;
        document.getElementById('fecha_vencimiento').innerHTML = obj.data.info.fecha_vencimiento;
        var total = 0;
        obj.data.items.map(v => {
                var valortotal = parseFloat(v["cantidad"]) * parseFloat(v["valorunit"]);
                total += valortotal;
        });
        var iva = parseFloat(document.getElementById("iva").value);
        var total_iva = iva * total;
        document.getElementById("total").innerText = obj.formatoPesos(total);
        document.getElementById("total_iva").innerText = obj.formatoPesos(total_iva);
        document.getElementById("total_gran").innerText = obj.formatoPesos( total + total_iva);
    },
    serializarData: () => {
        obj.calcular();
        obj.data.info.dias_vencimiento = document.getElementById("dias_vencimiento").value;
        obj.data.info.iva = document.getElementById("iva").value;
        obj.data.info.cotizacion = document.getElementById("cotizacion").value;
        obj.data.info.nombre = document.getElementById("nombre").value;
        obj.data.info.nit = document.getElementById("nit").value;
        obj.data.info.direcion = document.getElementById("direcion").value;
        obj.data.info.marca = document.getElementById("marca").value;
        obj.data.info.ciudad = document.getElementById("ciudad").value;
        obj.data.info.serial = document.getElementById("serial").value;
        obj.data.info.correo = document.getElementById("correo").value;
        obj.data.info.horas = document.getElementById("horas").value;
        obj.data.info.telefonos = document.getElementById("telefonos").value;
    },
    inputText: () => {
        var inputs = document.querySelectorAll('input.input');
        inputs.forEach(function (input) {
            var firstInput = input;
            var label = document.createElement('label');
            label.setAttribute("class", "input");
            label.setAttribute("id", firstInput.id);
            label.textContent = firstInput.value;
            firstInput.parentNode.replaceChild(label, firstInput);
        });
    },
    textInput: () => {
        var inputs = document.querySelectorAll('label.input');
        inputs.forEach(function (input) {
            var firstInput = input;
            var campo = document.createElement('input');
            campo.textContent = firstInput.value;
            campo.value = firstInput.innerHTML;
            campo.setAttribute("class", "input");
            campo.setAttribute("id", firstInput.id);
            firstInput.parentNode.replaceChild(campo, firstInput);
        });
    },
    limpiar: () => {
        document.getElementById("e_item").value = "";
        document.getElementById("e_cantidad").value = "";
        document.getElementById("e_referencia").value = "";
        document.getElementById("e_descripcion").value = "";
        document.getElementById("e_valorunit").value = "";
        document.getElementById("e_valortotal").value = "";
    },
    guardarItem: () => {
        if (obj.id == "") {
            var dt = {};
            dt.id = obj.generateUniqueId();
            dt.item = document.getElementById("e_item").value;
            dt.cantidad = document.getElementById("e_cantidad").value;
            dt.referencia = document.getElementById("e_referencia").value;
            dt.descripcion = document.getElementById("e_descripcion").value;
            dt.valorunit = document.getElementById("e_valorunit").value;
            dt.valortotal = document.getElementById("e_valortotal").value;
            obj.data.items.push(dt);;
        } else {
            obj.data.items.map(v => {
                if (v["id"] == obj.id) {
                    obj.id = "";
                    v["item"] = document.getElementById("e_item").value;
                    v["cantidad"] = document.getElementById("e_cantidad").value;
                    v["referencia"] = document.getElementById("e_referencia").value;
                    v["descripcion"] = document.getElementById("e_descripcion").value;
                    v["valorunit"] = document.getElementById("e_valorunit").value;
                    v["valortotal"] = document.getElementById("e_valortotal").value;
                }
            });
        }
        obj.calcular();
        obj.limpiar();
        obj.pintarItems();
    },
    generateUniqueId: () => {
        const date = new Date();
        const timestamp = date.getTime();
        const randomPart = Math.floor(Math.random() * 1000000);
        return `${timestamp}${randomPart}`;
    },
    pintarInfo: () => {
        document.getElementById("dias_vencimiento").value = obj.data.info.dias_vencimiento;
        document.getElementById("iva").value = obj.data.info.iva;
        document.getElementById("cotizacion").value = obj.data.info.cotizacion;
        document.getElementById("nombre").value = obj.data.info.nombre;
        document.getElementById("nit").value  = obj.data.info.nit;
        document.getElementById("direcion").value = obj.data.info.direcion;
        document.getElementById("marca").value = obj.data.info.marca;
        document.getElementById("ciudad").value = obj.data.info.ciudad;
        document.getElementById("serial").value = obj.data.info.serial;
        document.getElementById("correo").value = obj.data.info.correo;
        document.getElementById("horas").value = obj.data.info.horas;
        document.getElementById("telefonos").value = obj.data.info.telefonos;
    },
    pintarItems: () => {
        var thead = document.getElementById("data_row");
        thead.innerHTML = "";
        obj.data.items.map(v => {
            var tr = document.createElement("tr");
            tr.appendChild(obj.generarTD(v["item"], "", false));
            tr.appendChild(obj.generarTD(v["cantidad"], "", false));
            tr.appendChild(obj.generarTD(v["referencia"], "", false));
            tr.appendChild(obj.generarTD(v["descripcion"], "", false));
            tr.appendChild(obj.generarTD(v["valorunit"], "$", true));
            var valortotal = parseFloat(v["cantidad"]) * parseFloat(v["valorunit"]);
            //tr.appendChild(obj.generarTD(v["valortotal"], "$", true));
            tr.appendChild(obj.generarTD(valortotal, "$", true));
            tr.setAttribute("onclick", `obj.editarItem(${v["id"]})`);
            thead.appendChild(tr);
        });
    },
    generarTD: (valor, adicion, formato) => {
        var td = document.createElement("td");
        if (formato) {
            valor = valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
        td.innerText = `${adicion}${valor}`;
        return td;
    },
    formatoPesos: valor => {
        return "$"+valor.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    editarItem: id => {
        obj.data.items.map(v => {
            if (v["id"] == id) {
                obj.id = id;
                document.getElementById("e_item").value = v["item"];
                document.getElementById("e_cantidad").value = v["cantidad"];
                document.getElementById("e_referencia").value = v["referencia"];
                document.getElementById("e_descripcion").value = v["descripcion"];
                document.getElementById("e_valorunit").value = v["valorunit"];
                document.getElementById("e_valortotal").value = v["valortotal"];
            }
        });
    },
}
//------------------------------------------------------------------------------------
