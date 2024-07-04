var arma = {
    add: ()=>{
        var detalle = document.getElementById('div_detalle');
        detalle.innerHTML = '';

        var label = document.createElement('label');
        label.innerHTML = `Cantidad<br/>`;
        detalle.appendChild(label);
        var cantidad = document.createElement('input');
        cantidad.value = 1;
        cantidad.type = 'number';
        detalle.appendChild(cantidad); 
        detalle.appendChild( document.createElement('hr') ); 

        var label = document.createElement('label');
        label.innerHTML = `Nombre<br/>`;
        detalle.appendChild(label);
        var nombre = document.createElement('input');
        detalle.appendChild(nombre); 
        detalle.appendChild( document.createElement('hr') ); 

        var label = document.createElement('label');
        label.innerHTML = `Dado<br/>`;
        detalle.appendChild(label);
        var dado = document.createElement('input');
        detalle.appendChild(dado);
        detalle.appendChild( document.createElement('hr') ); 

        var label = document.createElement('label');
        label.innerHTML = `Distancia<br/>`;
        detalle.appendChild(label);
        var distacia = document.createElement('input');
        detalle.appendChild(distacia);
        detalle.appendChild( document.createElement('hr') ); 

        var label = document.createElement('label');
        label.innerHTML = `Descripcion<br/>`;
        detalle.appendChild(label);
        var descripcion = document.createElement('textarea');
        detalle.appendChild(descripcion);
        detalle.appendChild( document.createElement('hr') ); 

        var label = document.createElement('label');
        label.innerHTML = `Peso<br/>`;
        detalle.appendChild(label);
        var peso = document.createElement('input');
        detalle.appendChild(peso);
        detalle.appendChild( document.createElement('hr') ); 

        var label = document.createElement('label');
        label.innerHTML = `Costo<br/>`;
        detalle.appendChild(label);
        var costo = document.createElement('input');
        detalle.appendChild(costo);
        
        detalle.appendChild( document.createElement('br') );
        var save = document.createElement('button');
        save.innerHTML = `Guardar`;
        save.onclick = function(){
            var id = ((new Date()).getTime() * parseInt((Math.random()*1000)));
            cosas.push({ id, cantidad: cantidad.value, text: nombre.value, dado: dado.value, distacia: distacia.value, 
                descripcion: descripcion.value, peso: peso.value, costo: costo.value });
            detalle.innerHTML = '';
            arma.list();
        };
        detalle.appendChild(save);
        var cancelar = document.createElement('button');
        cancelar.innerHTML = `Cancelar`;
        cancelar.onclick = function(){
            detalle.innerHTML = '';
        };
        detalle.appendChild(cancelar);
        detalle.appendChild( document.createElement('hr') ); 

        var label = document.createElement('label');
        label.innerHTML = `Lista`;
        detalle.appendChild(label);
        detalle.appendChild( document.createElement('hr') );
        //-------------------
        var table = document.createElement('table');
        items.map(v=>{
            var tr = document.createElement('tr');
            var td = document.createElement('td');
            td.innerHTML = `${v.text} (${v.dado}) Distancia: ${v.distacia} Peso: ${v.peso} $${v.costo}<br/>${v.descripcion}`;
            td.style.cursor = 'pointer';
            tr.onclick = function(){
                nombre.value = `${v.text}`;
                dado.value = `${v.dado}`;
                distacia.value = `${v.distacia}`;
                descripcion.value = `${v.descripcion}`;
                peso.value = `${v.peso}`;
                costo.value = `${v.costo}`;
            };
            tr.appendChild(td);
            table.appendChild(tr);
        });
        detalle.appendChild(table);
    },
    list: ()=>{
        controles.map(control=>{
            if(control.id == 'listArma')
            {
                var temp = [];
                cosas.map(v=>{
                    temp.push(`${v.cantidad}: ${v.text} (${v.dado}) Dist: ${v.distacia} Peso: ${v.peso}`);
                });
                control.text.setText(temp);
            }
        });
    },
    listUsar: ()=>{
        const { list } = arma;
        var detalle = document.getElementById('div_detalle');
        detalle.innerHTML = '';
        var table = document.createElement('table');
        cosas.map(v=>{
            var tr = document.createElement('tr');
            var td = document.createElement('td');
            td.innerHTML = `${v.text} (${v.dado})`;
            tr.appendChild(td);

            var td = document.createElement('td');
            var input = document.createElement('input');
            input.type = 'number';
            input.value = v.cantidad;
            td.appendChild(input);
            tr.appendChild(td);

            var td = document.createElement('td');
            var btn = document.createElement('button');
            btn.innerHTML = 'Guardar';
            btn.onclick = function(){
                cosas.map(co=>{
                    if(co.id == v.id)
                    {
                        co.cantidad = input.value;
                    }
                });
                cosas = cosas.filter(fi=> fi.cantidad > 0 );
                detalle.innerHTML = '';
                list();
            };
            td.appendChild(btn);

            tr.appendChild(td);
            table.appendChild(tr);
        });
        detalle.appendChild(table);
    },
};