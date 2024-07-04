var calculo = {
    autotexto: (id, valor)=>{
        elementos.map(v=>{
            if(v.id == id)
            {
                v.text.setText(`${valor}`);
            }
        });
    },
    init: ()=>{
        const { autotexto } = calculo; 
        //suma Fisico 25
        var sum = 0;
        campos.map(v=>{
            switch (v.id) {
                case 11:
                case 12:
                case 13:
                    sum = parseInt(sum) + parseInt(v.valor);
                break;
            }
        });
        campos.map(v=>{ if(v.id == 25){ v.valor = sum; } });
        autotexto(25, parseInt(sum) );
        //suma Agilidad 26
        var sum = 0;
        campos.map(v=>{
            switch (v.id) {
                case 14:
                case 15:
                case 16:
                    sum = parseInt(sum) + parseInt(v.valor);
                break;
            }
        });
        campos.map(v=>{ if(v.id == 26){ v.valor = sum; } });
        autotexto(26, parseInt(sum) );
        //suma Inteligencia 27
        var sum = 0;
        campos.map(v=>{
            switch (v.id) {
                case 17:
                case 18:
                case 19:
                case 20:
                    sum = parseInt(sum) + parseInt(v.valor);
                break;
            }
        });
        campos.map(v=>{ if(v.id == 27){ v.valor = sum; } });
        autotexto(27, parseInt(sum) );
        //suma Espiritu 28
        var sum = 0;
        campos.map(v=>{
            switch (v.id) {
                case 21:
                case 22:
                case 23:
                case 24:
                    sum = parseInt(sum) + parseInt(v.valor);
                break;
            }
        });
        campos.map(v=>{ if(v.id == 28){ v.valor = sum; } });
        autotexto(28, parseInt(sum) );
    }
};