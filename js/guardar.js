var guardar = {
    init: () => {
        const { saveParty, loadParty } = guardar;
        var opciones = document.getElementById('div_opciones');
        opciones.innerHTML = '';
        var btn = document.createElement('button');
        btn.innerHTML = 'Guardar Hoja';
        btn.onclick = function () { saveParty(); };
        opciones.appendChild(btn);
        var car = document.createElement('input');
        car.type = 'file';
        car.innerHTML = 'Cargar';
        car.setAttribute('accept', '.luis');
        car.setAttribute('id', 'loarParty');
        //car.onchange = function(){ loadParty(); };
        opciones.appendChild(car);
        document.getElementById('loarParty').addEventListener('change', guardar.loadParty, false);
    },
    saveParty: () => {
        try {
            obj.serializarData();
            var elem = document.getElementById('descargar');
            elem.download = `${obj.data.info.cotizacion} (${obj.data.info.nombre} ${obj.data.info.nit}).luis`;
            elem.href = "data:application/octet-stream," + encodeURIComponent(JSON.stringify(obj.data));
            elem.click();
        } catch (error) {
            alert(`${error} E001`);
        }
    },
    loadParty: e => {
        try {
            var archivo = e.target.files[0];
            if (!archivo) {
                throw "Error:: Carga de archivo!";
            }
            var lector = new FileReader();
            lector.onload = function (e) {
                var contenido = e.target.result;
                var load = JSON.parse(contenido);
                if (load.hasOwnProperty('info')) {
                    obj.data = load;
                    obj.pintarInfo();
                    obj.pintarItems();
                    obj.calcular();
                } else {
                    throw "Error:: Carga nodo de Jugador!";
                }
            };
            lector.readAsText(archivo);
            alert(`Hoja cargada con exito!!`);;
        } catch (error) {
            alert(`${error}`);
        }
        document.getElementById('loarParty').value = '';
    },
    fechaFormato: (fechaYHora) => {
        //var fechaYHora = new Date();
        var dia = fechaYHora.getDate();
        var mes = fechaYHora.getMonth() + 1;
        var año = fechaYHora.getFullYear();
        var hora = fechaYHora.getHours();
        var minutos = fechaYHora.getMinutes();
        var segundos = fechaYHora.getSeconds();
        var fechaYHoraActual = dia + "/" + mes + "/" + año;// + " " + hora + ":" + minutos + ":" + segundos;
        return fechaYHoraActual;
    },
    sumarDias: (fecha, dias) => {
        var fechaSumada = new Date(fecha.getTime() + dias * 24 * 60 * 60 * 1000);
        var dia = fechaSumada.getDate();
        var mes = fechaSumada.getMonth() + 1;
        var año = fechaSumada.getFullYear();
        var hora = fechaSumada.getHours();
        var minutos = fechaSumada.getMinutes();
        var segundos = fechaSumada.getSeconds();

        var fechaYHoraActual = dia + "/" + mes + "/" + año;// + " " + hora + ":" + minutos + ":" + segundos;

        return fechaYHoraActual;
    }
};