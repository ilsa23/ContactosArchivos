var archivos ={
    escribir: function(){
        
        window.requestFileSystem(LocalFileSystem.PERSISTENT,0,archivos.accesoAlSistema,archivos.error);
    },
    accesoAlSistema: function(sa){
        sa.root.getFile('practica.txt',{create: true, exclusive: false},archivos.accesoArchivo, archivos.error);        
    },
    accesoArchivo: function(ea){
        ea.createWriter(archivos.escritor, archivos.error);
    },
    
    escritor: function(e){
        var cont = $('#aSend').val();
        e.write(cont);
        e.onwriteend = function(evt)
        {
            navigator.notification.alert('El archivo fue creado satisfactoriamente',null,'Archivos','Aceptar');            
        }
    },
    error: function(){
        navigator.notification.alert('Error',+err.code,null,'Archivos','¿Ya que?');
    },
    leer: function(){
        window.requestFileSystem(LocalFileSystem.PERSISTENT,0,archivos.accesoSistema,archivos.error);
    },
    accesoSistema: function(sa){
        sa.root.getFile('practica.txt',null,archivos.accesoFile,archivos.error);
    },
    accesoFile: function(ea){
        ea.file(archivos.lector,archivos.error);
    },
    lector: function(a){
        var lector = new FileReader();
        lector.readAsText(a);
        lector.onloadend = function(evt){
            $('#aGet').text(evt.target.result);
        }
    }
}