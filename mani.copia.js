?// content of index.js
var conexion = false;
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'modelo_rel'
});

/*  En este apartado se definen las varibles que corresponde
    a los parámetos que reciben los sensores.
 */
 // Variables para el oxígeno disuelto
 var ox_min = '0';
 var ox_minimo = true;
 var ox_max = '0';
 var ox_maximo = true;

 // Variables para apagar los motores
 var m1_estado = true;
 var m1_marcha = '0';

 var m2_estado = true;
 var m2_marcha = '0';

 var m3_estado = true;
 var m3_marcha = '0';

 var m4_estado = true;
 var m4_marcha = '0';

 /* ------------------------------------------------------------------------ */

var val_sensor = '';

var m1mxa = '0';
var m1maxamperaje = true;
var m2mxa = '0';
var m2maxamperaje = true;
var m3mxa = '0';
var m3maxamperaje = true;
var m4mxa = '0';
var m4maxamperaje = true;
var calibracion_oxd = '0';
var calibracion_oxd_vijia = true;


var modo_centinela = false;
var modo = '1';
/*
  0 = automático
  1 = manual
*/

var temporizador = 0;
var tem_ayudante = 0;

// Nos conectamos a la base de datos
connection.connect();

setInterval(function(){
  //temporizador = temporizador + 1;
  //console.log("El contador es: ", temporizador);
  //if (temporizador > 4) {
    //enviar();
  //}

  /* ------------------------------------------------------------------------------------------------------------------------ */
  //                           Esta sección se destina para la ejecución de las consultas

  // A continuación consultamos si cada motor se encuentra encendido o apagado
  setTimeout(function(){
    connection.query('SELECT marcha FROM actuador WHERE nombre = "m1";', function (error, results, fields) {
      if (error){
        console.log("A ocurrido un error: ", error);
      } else {
        //if (m1_marcha !== String(results[0].marcha)) {
          m1_marcha = String(results[0].marcha);
          m1_estado = false;
        //}
      }
      //console.log("m3mxa", m3mxa);
    });
  }, 500);

  setTimeout(function(){
    connection.query('SELECT marcha FROM actuador WHERE nombre = "m2";', function (error, results, fields) {
      if (error){
        console.log("A ocurrido un error: ", error);
      } else {
        //if (m2_marcha !== String(results[0].marcha)) {
          m2_marcha = String(results[0].marcha);
          m2_estado = false;
        //}
      }
      //console.log("m3mxa", m3mxa);
    });
  }, 1000);

  setTimeout(function(){
    connection.query('SELECT marcha FROM actuador WHERE nombre = "m3";', function (error, results, fields) {
      if (error){
        console.log("A ocurrido un error: ", error);
      } else {
        //if (m3_marcha !== String(results[0].marcha)) {
          m3_marcha = String(results[0].marcha);
          m3_estado = false;
        //}
      }
      //console.log("m3mxa", m3mxa);
    });
  }, 1500);

  setTimeout(function(){
    connection.query('SELECT marcha FROM actuador WHERE nombre = "m4";', function (error, results, fields) {
      if (error){
        console.log("A ocurrido un error: ", error);
      } else {
        //if (m4_marcha !== String(results[0].marcha)) {
          m4_marcha = String(results[0].marcha);
          m4_estado = false;
        //}
      }
      //console.log("m3mxa", m3mxa);
    });
  }, 2000);

  setTimeout(function(){
    connection.query('SELECT calibracion FROM sensor WHERE nombre = "oxd"', function (error, results, fields) {
      if (error){
        console.log("A ocurrido un error: ", error);
      } else {
        if (calibracion_oxd !== String(results[0].calibracion)) {
          calibracion_oxd = String(results[0].calibracion);
          calibracion_oxd_vijia = false;
        }
      }
      //console.log("m3mxa", m3mxa);
    });
  }, 2500);

  setTimeout(function(){
    // OXÍGENO DISUELTO
    // Trae el mínimo y máximo valor del exígeno disuelto
    connection.query('SELECT val_optimo_min, val_optimo_max FROM sensor WHERE nombre = "oxd"', function (error, results, fields) {
     if (error){
       console.log("A ocurrido un error: ", error);
     } else {
       if (ox_min !== String(results[0].val_optimo_min)) { // La variable booleana es  para controlar el envío de los datos, se envían solo cuando hayan cambiado
         ox_min = String(results[0].val_optimo_min);
         ox_minimo = false;
       }
       if (ox_max !== String(results[0].val_optimo_max)) {
         ox_max = String(results[0].val_optimo_max);
         ox_maximo = false;
       }
     }
     //console.log("ox_min", ox_min);
     //console.log("ox_max", ox_max);
    });
  }, 3000);

   setTimeout(function(){
     // MOTOR 1
     // Trae el máximo amperaje del motor 1
     // m1mxa
     connection.query('SELECT amp_max FROM actuador WHERE nombre = "m1"', function (error, results, fields) {
       if (error){
         console.log("A ocurrido un error: ", error);
       } else {
         if (m1mxa !== String(results[0].amp_max)) {
           m1mxa = String(results[0].amp_max);
           m1maxamperaje = false;
           //console.log("CONSULTA EL AMPERAJE MÁXIMO DEL MOTOR 1 Y ES: ", m1mxa);
         }
       }
       //console.log("m1mxa", m1mxa);
     });
   }, 3500);

   setTimeout(function(){
     // MOTOR 2
     // Trae el máximo amperaje del motor 2
     // m2mxa
     connection.query('SELECT amp_max FROM actuador WHERE nombre = "m2"', function (error, results, fields) {
       if (error){
         console.log("A ocurrido un error: ", error);
       } else {
         if (m2mxa !== String(results[0].amp_max)) {
           m2mxa = String(results[0].amp_max);
           m2maxamperaje = false;
           //console.log("CONSULTA EL AMPERAJE MÁXIMO DEL MOTOR 1 Y ES: ", m2mxa);
         }
       }
       //console.log("m2mxa", m2mxa);
     });
   }, 4000);

   setTimeout(function(){
     // MOTOR 3
     // Trae el máximo amperaje del motor 3
     // m3mxa
     connection.query('SELECT amp_max FROM actuador WHERE nombre = "m3"', function (error, results, fields) {
       if (error){
         console.log("A ocurrido un error: ", error);
       } else {
         if (m3mxa !== String(results[0].amp_max)) {
           m3mxa = String(results[0].amp_max);
           m3maxamperaje = false;
           //console.log("CONSULTA EL AMPERAJE MÁXIMO DEL MOTOR 3 Y ES: ", m3mxa);
         }
       }
       //console.log("m3mxa", m3mxa);
     });
   }, 4500);

   setTimeout(function(){
     // MOTOR 4
     // Trae el máximo amperaje del motor 4
     // m4mxa
     connection.query('SELECT amp_max FROM actuador WHERE nombre = "m4"', function (error, results, fields) {
       if (error){
         console.log("A ocurrido un error: ", error);
       } else {
         if (m4mxa !== String(results[0].amp_max)) {
           m4mxa = String(results[0].amp_max);
           m4maxamperaje = false;
           //console.log("CONSULTA EL AMPERAJE MÁXIMO DEL MOTOR 4 Y ES: ", m4mxa);
         }
       }
       //console.log("m4mxa", m4mxa);
     });
   }, 5000);

  setTimeout(function(){
    // Comprobamos el módo en que el usuario desea utilizar el sistema (Automático o manual)
    // Trae el mínimo y máximo valor del exígeno disuelto
    connection.query('SELECT modo FROM controlador WHERE nombre = "motores"', function (error, results, fields) {
      if (error){
        console.log("A ocurrido un error: ", error);
      } else {
        if (modo !== String(results[0].modo)) { // La variable booleana es  para controlar el envío de los datos, se envían solo cuando hayan cambiado
          modo = String(results[0].modo);
          modo_centinela = false;

          // Inmediatamente se llama a la función, hacemos la solicitud de los datos que necesitamos
          port_serie.write("0ver\n", function(err) { // Omar, cómo recibe usted el valor mínimo del Oxígeno disuelto y cómo el máximo valor
            if (err) {
              return console.log('Error on write: ', err.message);
            }
          });
        }
      }
      //console.log("ox_min", ox_min);
      //console.log("ox_max", ox_max);
    });
  }, 5500);


  // Nos disponemos a enviar los valores consultados al arduino
  /* ----------------------------------------------------------------------- */
  setTimeout(function() {
    temporizador = 0;
    if (!calibracion_oxd_vijia) {
      port_serie.write(calibracion_oxd +"CAL\n", function(err) { // Omar, cómo recibe usted el valor mínimo del Oxígeno disuelto y cómo el máximo valor
        if (err) {
          return console.log('Error on write: ', err.message);
        }
      });
      //console.log("Envía CAL --------------------------------------------------------------------");
      //console.log(calibracion_oxd);
      calibracion_oxd_vijia = true;
    }
  }, 1000);

  setTimeout(function() {
    temporizador = 0;
    if (!ox_minimo) {
      port_serie.write(ox_min +"OXmin\n", function(err) { // Omar, cómo recibe usted el valor mínimo del Oxígeno disuelto y cómo el máximo valor
        if (err) {
          return console.log('Error on write: ', err.message);
        }
      });
      //console.log("Envía oxmin --------------------------------------------------------------------");
      //console.log(ox_min);
      ox_minimo = true;
    }
  }, 2000);

  setTimeout(function() {
    temporizador = 0;
    if (!ox_maximo) {
      port_serie.write(ox_max+"OXmax\n", function(err) {
        if (err) {
          return console.log('Error on write: ', err.message);
        }
      });
      //console.log("Envía oxmax --------------------------------------------------------------------");
      //console.log(ox_max);
      ox_maximo = true;
    }
  }, 3000);

  setTimeout(function() {
    temporizador = 0;
    if (!m1maxamperaje) {
      port_serie.write(m1mxa+"am1\n", function(err) {
        if (err) {
          return console.log('Error on write: ', err.message);
        }
      });
      //console.log("Envía m1 --------------------------------------------------------------------");
      //console.log(m1mxa);
      m1maxamperaje = true;
    }
  }, 4000);

  setTimeout(function() {
    temporizador = 0;
    if (!m2maxamperaje) {
      port_serie.write(m2mxa+"am2\n", function(err) {
        if (err) {
          return console.log('Error on write: ', err.message);
        }
      });
      //console.log("Envía m2 --------------------------------------------------------------------");
      //console.log(m2mxa);
      m2maxamperaje = true;
    }
  }, 5000);

  setTimeout(function() {
    temporizador = 0;
    if (!m3maxamperaje) {
      port_serie.write(m3mxa+"am3\n", function(err) {
        if (err) {
          return console.log('Error on write: ', err.message);
        }
      });
      //console.log("Envía m3 --------------------------------------------------------------------");
      //console.log(m3mxa);
      m3maxamperaje = true;
    }
  }, 6000);

  setTimeout(function() {
    temporizador = 0;
    if (!m4maxamperaje) {
      port_serie.write(m4mxa+"am4\n", function(err) {
        if (err) {
          return console.log('Error on write: ', err.message);
        }
      });
      //console.log("Envía m4 --------------------------------------------------------------------");
      //console.log(m4mxa);
      m4maxamperaje = true;
    }
  }, 7000);

  if (!modo_centinela) {
    // Apagamos los motores solo cuando el modo sea manual
    if (modo === '1') {
      // El modo es manual
      setTimeout(function() {
          port_serie.write("0enc\n", function(err) { // Detenemos la secuencia de encendido de los motores
            if (err) {
              return console.log('Error on write: ', err.message);
            }
            //console.log("Establece modo manual  --------------------------------------------------------------------");
          });
      }, 8000);
      /* A continuación apagaremos motor por motor */
      // Apaga motor 1
      //if (!m1_estado) {
        setTimeout(function() {
          port_serie.write(m1_marcha+"on_1\n", function(err) { // Omar, cómo recibe usted el valor mínimo del Oxígeno disuelto y cómo el máximo valor
            if (err) {
              return console.log('Error on write: ', err.message);
            }
            //console.log("Enciende motor-apaga 1  --------------------------------------------------------------------");
            //console.log("-> ", m1_marcha);
          });
          m1_estado = true;
        }, 9000);
      //}

      // Apaga motor 2
      //if (!m2_estado) {
        setTimeout(function() {
          port_serie.write(m2_marcha+"on_2\n", function(err) { // Omar, cómo recibe usted el valor mínimo del Oxígeno disuelto y cómo el máximo valor
            if (err) {
              return console.log('Error on write: ', err.message);
            }
            //console.log("Enciende-apaga motor 2  --------------------------------------------------------------------");
            //console.log("-> ", m2_marcha);
          });
          m2_estado = true;
        }, 10000);
      //}

      // Apaga motor 3
      //if (!m3_estado) {
        setTimeout(function() {
          port_serie.write(m3_marcha+"on_3\n", function(err) { // Omar, cómo recibe usted el valor mínimo del Oxígeno disuelto y cómo el máximo valor
            if (err) {
              return console.log('Error on write: ', err.message);
            }
            //console.log("Enciende-apaga motor 3  --------------------------------------------------------------------");
            //console.log("-> ", m3_marcha);
          });
          m3_estado = true;
        }, 11000);
      //}

      // Apaga motor 4
      //if (!m4_estado) {
        setTimeout(function() {
          port_serie.write(m4_marcha+"on_4\n", function(err) { // Omar, cómo recibe usted el valor mínimo del Oxígeno disuelto y cómo el máximo valor
            if (err) {
              return console.log('Error on write: ', err.message);
            }
            //console.log("Enciende-apaga motor 4  --------------------------------------------------------------------");
            //console.log("-> ", m4_marcha);
          });
          m4_estado = true;
        }, 12000);
      //}
    } else {
      if (modo === '0') {
        // Cuando el modo sea automático, que dicho modo se encarge de encender los motores
        setTimeout(function() {
            port_serie.write("1enc\n", function(err) {
              if (err) {
                return console.log('Error on write: ', err.message);
              }
              //console.log("Establece modo automático  --------------------------------------------------------------------");
            });
        }, 3000);
      }
    }
  }

    //console.log("El temporizador es: ", temporizador);
}, 13000);

const requestHandler = (request, response) => {
  if (request.url.indexOf("t") != -1) {
    var inicio = request.url.indexOf('=') + 1;
    var longitud = request.url.length;
    var cadena = request.url.substring(inicio, longitud)
    response.end('La temperatura actual es: ' + val_sensor + " campura: " + cadena)
  } else {
    if (request.url.indexOf("p") != -1) {
      response.end('El PH actual es: ' + p)
    } else {
      if (request.url.indexOf("o") != -1) {
        response.end('El O2 disuelto actual es: ' + o)
      }
    }
  }
}

const http = require('http')
const port = 8000

var SerialPort = require("serialport");
var port_serie = new SerialPort("COM10", {
  baudRate: 9600
});

function enviar() {
  /*
  ASÍ SE ENVÍAN DATOS POR EL PUERTO SERIAL AL ARDUINO, AHORA,
  ¿CÓMO RECIBIRLOS EN ARDUINO Y CAMBIAR EL VALOR DE LAS VARIABLES?
  */
  setTimeout(function() {
    temporizador = 0;
    if (!calibracion_oxd_vijia) {
      port_serie.write(calibracion_oxd +"CAL\n", function(err) { // Omar, cómo recibe usted el valor mínimo del Oxígeno disuelto y cómo el máximo valor
        if (err) {
          return console.log('Error on write: ', err.message);
        }
      });
      console.log("Envía CAL");
      console.log(calibracion_oxd);
      calibracion_oxd_vijia = true;
    }
  }, 3000);

  setTimeout(function() {
    temporizador = 0;
    if (!ox_minimo) {
      port_serie.write(ox_min +"OXmin\n", function(err) { // Omar, cómo recibe usted el valor mínimo del Oxígeno disuelto y cómo el máximo valor
        if (err) {
          return console.log('Error on write: ', err.message);
        }
      });
      //console.log("Envía oxmin");
      console.log(ox_min);
      ox_minimo = true;
    }
  }, 6000);

  setTimeout(function() {
    temporizador = 0;
    if (!ox_maximo) {
      port_serie.write(ox_max+"OXmax\n", function(err) {
        if (err) {
          return console.log('Error on write: ', err.message);
        }
      });
      //console.log("Envía oxmax");
      console.log(ox_max);
      ox_maximo = true;
    }
  }, 9000);

  setTimeout(function() {
    temporizador = 0;
    if (!m1maxamperaje) {
      //console.log("ENVÍA EL AMPERAJE MÁXIMO DEL MOTOR 1 Y ES: ", m1mxa);
      port_serie.write(m1mxa+"am1\n", function(err) {
        if (err) {
          return console.log('Error on write: ', err.message);
        }
      });
      //console.log("Envía m1");
      console.log(m1mxa);
      m1maxamperaje = true;
    }
  }, 12000);

  setTimeout(function() {
    temporizador = 0;
    if (!m2maxamperaje) {
      //console.log("ENVÍA EL AMPERAJE MÁXIMO DEL MOTOR 2 Y ES: ", m2mxa);
      port_serie.write(m2mxa+"am2\n", function(err) {
        if (err) {
          return console.log('Error on write: ', err.message);
        }
      });
      //console.log("Envía m2");
      console.log(m2mxa);
      m2maxamperaje = true;
    }
  }, 15000);

  setTimeout(function() {
    temporizador = 0;
    if (!m3maxamperaje) {
      //console.log("ENVÍA EL AMPERAJE MÁXIMO DEL MOTOR 3 Y ES: ", m3mxa);
      port_serie.write(m3mxa+"am3\n", function(err) {
        if (err) {
          return console.log('Error on write: ', err.message);
        }
      });
      //console.log("Envía m3");
      console.log(m3mxa);
      m3maxamperaje = true;
    }
  }, 18000);

  setTimeout(function() {
    temporizador = 0;
    if (!m4maxamperaje) {
      //console.log("ENVÍA EL AMPERAJE MÁXIMO DEL MOTOR 4 Y ES: ", m4mxa);
      port_serie.write(m4mxa+"am4\n", function(err) {
        if (err) {
          return console.log('Error on write: ', err.message);
        }
      });
      //console.log("Envía m4");
      console.log(m4mxa);
      m4maxamperaje = true;
    }
  }, 21000);
}

port_serie.on('open', function() {
  // En cuanto se abre el puerto se establece una conexión a la base de datos
  port_serie.on("data", function (data) {
    temporizador = 0;
      //console.log("El dato es: ", data.toString());
      /*
      val_sensor = data.toString();
      */


      // results[0].nombre - results[0][nombre]

      /*  Pasa los parámetros a los sensores según los registros
          en la base de datos.
       connection.query('SELECT val_optimo_min FROM sensor WHERE nombre = "oxd"', function (error, results, fields) {
         if (error){
           console.log("A ocurrido un error: ", error);
         } else {
           dataset = String(results[0].val_optimo_min);
           //console.log("Mandado: ", dataset);
         }
       });
       */
      // Gestiona los motores. Actualmente hay 3 registros
      /*
      connection.query('SELECT marcha, estado FROM actuador', function (error, results, fields) {
        if (error){
          console.log("A ocurrido un error: ", error);
        } else {
          if (parseInt(results[0].estado) > 0) {
            m1_estado = 1;
            m1_marcha = parseInt(results[0].marcha);
          } else {
            m1_estado = 0;
            m1_marcha = 0;
          }
          if (parseInt(results[1].estado) > 0) {
            m2_estado = 1;
            m2_marcha = parseInt(results[1].marcha);
          } else {
            m2_estado = 0;
            m2_marcha = 0;
          }
          if (parseInt(results[2].estado) > 0) {
            m3_estado = 1;
            m3_marcha = parseInt(results[2].marcha);
          } else {
            m3_estado = 0;
            m3_marcha = 0;
          }*/
          /*console.log("La data 1 es: ", results[0]);
          console.log("La data 2 es: ", results[1]);
          console.log("La data 3 es: ", results[2]);*/

          /*  Es posible así:
                for (var i = 0; i < results.length; i++) {
                  console.log("La data "+ i +" es: ", results[i]);
                }
          */
          /*
        }
      });*/

      // Gestiona el controlador de los actuadores
      /*
      connection.query('SELECT marcha, estado FROM actuador', function (error, results, fields) {
        if (error){
          console.log("A ocurrido un error: ", error);
        } else {
          if (parseInt(results[0].estado) > 0) {
            m1_estado = 1;
            m1_marcha = parseInt(results[0].marcha);
          } else {
            m1_estado = 0;
            m1_marcha = 0;
          }
          if (parseInt(results[1].estado) > 0) {
            m2_estado = 1;
            m2_marcha = parseInt(results[1].marcha);
          } else {
            m2_estado = 0;
            m2_marcha = 0;
          }
          if (parseInt(results[2].estado) > 0) {
            m3_estado = 1;
            m3_marcha = parseInt(results[2].marcha);
          } else {
            m3_estado = 0;
            m3_marcha = 0;
          }
        }
      });*/


      //console.log(data);
      val_sensor = data.toString();
      console.log(val_sensor);
      if (val_sensor.indexOf("t") != -1) {
        if (val_sensor.indexOf('=') != -1) {

          var inicio = val_sensor.indexOf('=') + 1;
          var longitud = val_sensor.length;
          val_sensor = val_sensor.substring(inicio, longitud);
          connection.query('INSERT INTO datos (valor, fk_sensor) VALUES ('+val_sensor+', (SELECT id_sensor FROM sensor WHERE nombre = "tem"))', function (error, results, fields) {
          //connection.query('INSERT INTO datos (valor, fk_sensor) VALUES ('+val_sensor+', "45")', function (error, results, fields) {
            connection.commit(function(err) {
              if (err) {
                return connection.rollback(function() {
                  throw err;
                });
              }
            });
          });
        }
        console.log("Lee temperatura");
      } else {
        if (val_sensor.indexOf("p") != -1) {
          if (val_sensor.indexOf('=') != -1) {
            var inicio = val_sensor.indexOf('=') + 1;
            var longitud = val_sensor.length;
            val_sensor = val_sensor.substring(inicio, longitud);
            connection.query('INSERT INTO datos (valor, fk_sensor) VALUES ('+val_sensor+', (SELECT id_sensor FROM sensor WHERE nombre = "ph"))', function (error, results, fields) {
              connection.commit(function(err) {
                if (err) {
                  return connection.rollback(function() {
                    throw err;
                  });
                }
              });
            });
          }
          console.log("Lee PH");
        } else {
          if (val_sensor.indexOf("o") != -1) {
            if (val_sensor.indexOf('=') != -1) {
              var inicio = val_sensor.indexOf('=') + 1;
              var longitud = val_sensor.length;
              val_sensor = val_sensor.substring(inicio, longitud);
              connection.query('INSERT INTO datos (valor, fk_sensor) VALUES ('+val_sensor+', (SELECT id_sensor FROM sensor WHERE nombre = "oxd"))', function (error, results, fields) {
                connection.commit(function(err) {
                  if (err) {
                    return connection.rollback(function() {
                      throw err;
                    });
                  }
                });
              });
            }
            console.log("Lee O2 disuelto");
          } else {
            if (val_sensor.indexOf("m1l1v") != -1) {
              if (val_sensor.indexOf('=') != -1) {
                var inicio = val_sensor.indexOf('=') + 1;
                var longitud = val_sensor.length;
                val_sensor = val_sensor.substring(inicio, longitud);
                connection.query('INSERT INTO datos (valor, fk_sensor) VALUES ('+val_sensor+', (SELECT id_sensor FROM sensor WHERE nombre = "vol_m1l1"))', function (error, results, fields) {
                  connection.commit(function(err) {
                    if (err) {
                      return connection.rollback(function() {
                        throw err;
                      });
                    }
                  });
                });
              }
              console.log("Lee voltaje motor 1, linea 1");
            } else {
              if (val_sensor.indexOf("m1l2v") != -1) {
                if (val_sensor.indexOf('=') != -1) {
                  var inicio = val_sensor.indexOf('=') + 1;
                  var longitud = val_sensor.length;
                  val_sensor = val_sensor.substring(inicio, longitud);
                  connection.query('INSERT INTO datos (valor, fk_sensor) VALUES ('+val_sensor+', (SELECT id_sensor FROM sensor WHERE nombre = "vol_m1l2"))', function (error, results, fields) {
                    connection.commit(function(err) {
                      if (err) {
                        return connection.rollback(function() {
                          throw err;
                        });
                      }
                    });
                  });
                }
                console.log("Lee voltaje motor 1, linea 2");
              } else {
                if (val_sensor.indexOf("m1l3v") != -1) {
                  if (val_sensor.indexOf('=') != -1) {
                    var inicio = val_sensor.indexOf('=') + 1;
                    var longitud = val_sensor.length;
                    val_sensor = val_sensor.substring(inicio, longitud);
                    connection.query('INSERT INTO datos (valor, fk_sensor) VALUES ('+val_sensor+', (SELECT id_sensor FROM sensor WHERE nombre = "vol_m1l3"))', function (error, results, fields) {
                      connection.commit(function(err) {
                        if (err) {
                          return connection.rollback(function() {
                            throw err;
                          });
                        }
                      });
                    });
                  }
                  console.log("Lee voltaje motor 1, linea 3");
                } else {
                  if (val_sensor.indexOf("m2l1v") != -1) {
                    if (val_sensor.indexOf('=') != -1) {
                      var inicio = val_sensor.indexOf('=') + 1;
                      var longitud = val_sensor.length;
                      val_sensor = val_sensor.substring(inicio, longitud);
                      connection.query('INSERT INTO datos (valor, fk_sensor) VALUES ('+val_sensor+', (SELECT id_sensor FROM sensor WHERE nombre = "vol_m2l1"))', function (error, results, fields) {
                        connection.commit(function(err) {
                          if (err) {
                            return connection.rollback(function() {
                              throw err;
                            });
                          }
                        });
                      });
                    }
                    console.log("Lee voltaje motor 2, linea 1");
                  } else {
                    if (val_sensor.indexOf("m2l2v") != -1) {
                      if (val_sensor.indexOf('=') != -1) {
                        var inicio = val_sensor.indexOf('=') + 1;
                        var longitud = val_sensor.length;
                        val_sensor = val_sensor.substring(inicio, longitud);
                        connection.query('INSERT INTO datos (valor, fk_sensor) VALUES ('+val_sensor+', (SELECT id_sensor FROM sensor WHERE nombre = "vol_m2l2"))', function (error, results, fields) {
                          connection.commit(function(err) {
                            if (err) {
                              return connection.rollback(function() {
                                throw err;
                              });
                            }
                          });
                        });
                      }
                      console.log("Lee voltaje motor 2, linea 2");
                    } else {
                      if (val_sensor.indexOf("m2l3v") != -1) {
                        if (val_sensor.indexOf('=') != -1) {
                          var inicio = val_sensor.indexOf('=') + 1;
                          var longitud = val_sensor.length;
                          val_sensor = val_sensor.substring(inicio, longitud);
                          connection.query('INSERT INTO datos (valor, fk_sensor) VALUES ('+val_sensor+', (SELECT id_sensor FROM sensor WHERE nombre = "vol_m2l3"))', function (error, results, fields) {
                            connection.commit(function(err) {
                              if (err) {
                                return connection.rollback(function() {
                                  throw err;
                                });
                              }
                            });
                          });
                        }
                        console.log("Lee voltaje motor 2, linea 3");
                      } else {
                        if (val_sensor.indexOf("m3l1v") != -1) {
                          if (val_sensor.indexOf('=') != -1) {
                            var inicio = val_sensor.indexOf('=') + 1;
                            var longitud = val_sensor.length;
                            val_sensor = val_sensor.substring(inicio, longitud);
                            connection.query('INSERT INTO datos (valor, fk_sensor) VALUES ('+val_sensor+', (SELECT id_sensor FROM sensor WHERE nombre = "vol_m3l1"))', function (error, results, fields) {
                              connection.commit(function(err) {
                                if (err) {
                                  return connection.rollback(function() {
                                    throw err;
                                  });
                                }
                              });
                            });
                          }
                          console.log("Lee voltaje motor 3, linea 1");
                        } else {
                          if (val_sensor.indexOf("m3l2v") != -1) {
                            if (val_sensor.indexOf('=') != -1) {
                              var inicio = val_sensor.indexOf('=') + 1;
                              var longitud = val_sensor.length;
                              val_sensor = val_sensor.substring(inicio, longitud);
                              connection.query('INSERT INTO datos (valor, fk_sensor) VALUES ('+val_sensor+', (SELECT id_sensor FROM sensor WHERE nombre = "vol_m3l2"))', function (error, results, fields) {
                                connection.commit(function(err) {
                                  if (err) {
                                    return connection.rollback(function() {
                                      throw err;
                                    });
                                  }
                                });
                              });
                            }
                            console.log("Lee voltaje motor 3, linea 2");
                          } else {
                            if (val_sensor.indexOf("m3l3v") != -1) {
                              if (val_sensor.indexOf('=') != -1) {
                                var inicio = val_sensor.indexOf('=') + 1;
                                var longitud = val_sensor.length;
                                val_sensor = val_sensor.substring(inicio, longitud);
                                connection.query('INSERT INTO datos (valor, fk_sensor) VALUES ('+val_sensor+', (SELECT id_sensor FROM sensor WHERE nombre = "vol_m3l3"))', function (error, results, fields) {
                                  connection.commit(function(err) {
                                    if (err) {
                                      return connection.rollback(function() {
                                        throw err;
                                      });
                                    }
                                  });
                                });
                              }
                              console.log("Lee voltaje motor 3, linea 3");
                            } else {
                              if (val_sensor.indexOf("m4l1v") != -1) {
                                if (val_sensor.indexOf('=') != -1) {
                                  var inicio = val_sensor.indexOf('=') + 1;
                                  var longitud = val_sensor.length;
                                  val_sensor = val_sensor.substring(inicio, longitud);
                                  connection.query('INSERT INTO datos (valor, fk_sensor) VALUES ('+val_sensor+', (SELECT id_sensor FROM sensor WHERE nombre = "vol_m4l1"))', function (error, results, fields) {
                                    connection.commit(function(err) {
                                      if (err) {
                                        return connection.rollback(function() {
                                          throw err;
                                        });
                                      }
                                    });
                                  });
                                }
                                console.log("Lee voltaje motor 4, linea 1");
                              } else {
                                if (val_sensor.indexOf("m4l2v") != -1) {
                                  if (val_sensor.indexOf('=') != -1) {
                                    var inicio = val_sensor.indexOf('=') + 1;
                                    var longitud = val_sensor.length;
                                    val_sensor = val_sensor.substring(inicio, longitud);
                                    connection.query('INSERT INTO datos (valor, fk_sensor) VALUES ('+val_sensor+', (SELECT id_sensor FROM sensor WHERE nombre = "vol_m4l2"))', function (error, results, fields) {
                                      connection.commit(function(err) {
                                        if (err) {
                                          return connection.rollback(function() {
                                            throw err;
                                          });
                                        }
                                      });
                                    });
                                  }
                                  console.log("Lee voltaje motor 4, linea 2");
                                } else {
                                  if (val_sensor.indexOf("m4l3v") != -1) {
                                    if (val_sensor.indexOf('=') != -1) {
                                      var inicio = val_sensor.indexOf('=') + 1;
                                      var longitud = val_sensor.length;
                                      val_sensor = val_sensor.substring(inicio, longitud);
                                      connection.query('INSERT INTO datos (valor, fk_sensor) VALUES ('+val_sensor+', (SELECT id_sensor FROM sensor WHERE nombre = "vol_m4l3"))', function (error, results, fields) {
                                        connection.commit(function(err) {
                                          if (err) {
                                            return connection.rollback(function() {
                                              throw err;
                                            });
                                          }
                                        });
                                      });
                                    }
                                    console.log("Lee voltaje motor 4, linea 3");
                                  } else {
                                    if (val_sensor.indexOf("m1l1a") != -1) {
                                      if (val_sensor.indexOf('=') != -1) {
                                        var inicio = val_sensor.indexOf('=') + 1;
                                        var longitud = val_sensor.length;
                                        val_sensor = val_sensor.substring(inicio, longitud);
                                        connection.query('INSERT INTO datos (valor, fk_sensor) VALUES ('+val_sensor+', (SELECT id_sensor FROM sensor WHERE nombre = "am_m1l1"))', function (error, results, fields) {
                                          connection.commit(function(err) {
                                            if (err) {
                                              return connection.rollback(function() {
                                                throw err;
                                              });
                                            }
                                          });
                                        });
                                      }
                                      console.log("Lee amperaje motor 1, linea 1");
                                    } else {
                                      if (val_sensor.indexOf("m1l2a") != -1) {
                                        if (val_sensor.indexOf('=') != -1) {
                                          var inicio = val_sensor.indexOf('=') + 1;
                                          var longitud = val_sensor.length;
                                          val_sensor = val_sensor.substring(inicio, longitud);
                                          connection.query('INSERT INTO datos (valor, fk_sensor) VALUES ('+val_sensor+', (SELECT id_sensor FROM sensor WHERE nombre = "am_m1l2"))', function (error, results, fields) {
                                            connection.commit(function(err) {
                                              if (err) {
                                                return connection.rollback(function() {
                                                  throw err;
                                                });
                                              }
                                            });
                                          });
                                        }
                                        console.log("Lee amperaje motor 1, linea 2");
                                      } else {
                                        if (val_sensor.indexOf("m1l3a") != -1) {
                                          if (val_sensor.indexOf('=') != -1) {
                                            var inicio = val_sensor.indexOf('=') + 1;
                                            var longitud = val_sensor.length;
                                            val_sensor = val_sensor.substring(inicio, longitud);
                                            connection.query('INSERT INTO datos (valor, fk_sensor) VALUES ('+val_sensor+', (SELECT id_sensor FROM sensor WHERE nombre = "am_m1l3"))', function (error, results, fields) {
                                              connection.commit(function(err) {
                                                if (err) {
                                                  return connection.rollback(function() {
                                                    throw err;
                                                  });
                                                }
                                              });
                                            });
                                          }
                                          console.log("Lee amperaje motor 1, linea 3");
                                        } else {
                                          if (val_sensor.indexOf("m2l1a") != -1) {
                                            if (val_sensor.indexOf('=') != -1) {
                                              var inicio = val_sensor.indexOf('=') + 1;
                                              var longitud = val_sensor.length;
                                              val_sensor = val_sensor.substring(inicio, longitud);
                                              connection.query('INSERT INTO datos (valor, fk_sensor) VALUES ('+val_sensor+', (SELECT id_sensor FROM sensor WHERE nombre = "am_m2l1"))', function (error, results, fields) {
                                                connection.commit(function(err) {
                                                  if (err) {
                                                    return connection.rollback(function() {
                                                      throw err;
                                                    });
                                                  }
                                                });
                                              });
                                            }
                                            console.log("Lee amperaje motor 2, linea 1");
                                          } else {
                                            if (val_sensor.indexOf("m2l2a") != -1) {
                                              if (val_sensor.indexOf('=') != -1) {
                                                var inicio = val_sensor.indexOf('=') + 1;
                                                var longitud = val_sensor.length;
                                                val_sensor = val_sensor.substring(inicio, longitud);
                                                connection.query('INSERT INTO datos (valor, fk_sensor) VALUES ('+val_sensor+', (SELECT id_sensor FROM sensor WHERE nombre = "am_m2l2"))', function (error, results, fields) {
                                                  connection.commit(function(err) {
                                                    if (err) {
                                                      return connection.rollback(function() {
                                                        throw err;
                                                      });
                                                    }
                                                  });
                                                });
                                              }
                                              console.log("Lee amperaje motor 2, linea 2");
                                            } else {
                                              if (val_sensor.indexOf("m2l3a") != -1) {
                                                if (val_sensor.indexOf('=') != -1) {
                                                  var inicio = val_sensor.indexOf('=') + 1;
                                                  var longitud = val_sensor.length;
                                                  val_sensor = val_sensor.substring(inicio, longitud);
                                                  connection.query('INSERT INTO datos (valor, fk_sensor) VALUES ('+val_sensor+', (SELECT id_sensor FROM sensor WHERE nombre = "am_m2l3"))', function (error, results, fields) {
                                                    connection.commit(function(err) {
                                                      if (err) {
                                                        return connection.rollback(function() {
                                                          throw err;
                                                        });
                                                      }
                                                    });
                                                  });
                                                }
                                                console.log("Lee amperaje motor 2, linea 3");
                                              } else {
                                                if (val_sensor.indexOf("m3l1a") != -1) {
                                                  if (val_sensor.indexOf('=') != -1) {
                                                    var inicio = val_sensor.indexOf('=') + 1;
                                                    var longitud = val_sensor.length;
                                                    val_sensor = val_sensor.substring(inicio, longitud);
                                                    connection.query('INSERT INTO datos (valor, fk_sensor) VALUES ('+val_sensor+', (SELECT id_sensor FROM sensor WHERE nombre = "am_m3l1"))', function (error, results, fields) {
                                                      connection.commit(function(err) {
                                                        if (err) {
                                                          return connection.rollback(function() {
                                                            throw err;
                                                          });
                                                        }
                                                      });
                                                    });
                                                  }
                                                  console.log("Lee amperaje motor 3, linea 1");
                                                } else {
                                                  if (val_sensor.indexOf("m3l2a") != -1) {
                                                    if (val_sensor.indexOf('=') != -1) {
                                                      var inicio = val_sensor.indexOf('=') + 1;
                                                      var longitud = val_sensor.length;
                                                      val_sensor = val_sensor.substring(inicio, longitud);
                                                      connection.query('INSERT INTO datos (valor, fk_sensor) VALUES ('+val_sensor+', (SELECT id_sensor FROM sensor WHERE nombre = "am_m3l2"))', function (error, results, fields) {
                                                        connection.commit(function(err) {
                                                          if (err) {
                                                            return connection.rollback(function() {
                                                              throw err;
                                                            });
                                                          }
                                                        });
                                                      });
                                                    }
                                                    console.log("Lee amperaje motor 3, linea 2");
                                                  } else {
                                                    if (val_sensor.indexOf("m3l3a") != -1) {
                                                      if (val_sensor.indexOf('=') != -1) {
                                                        var inicio = val_sensor.indexOf('=') + 1;
                                                        var longitud = val_sensor.length;
                                                        val_sensor = val_sensor.substring(inicio, longitud);
                                                        connection.query('INSERT INTO datos (valor, fk_sensor) VALUES ('+val_sensor+', (SELECT id_sensor FROM sensor WHERE nombre = "am_m3l3"))', function (error, results, fields) {
                                                          connection.commit(function(err) {
                                                            if (err) {
                                                              return connection.rollback(function() {
                                                                throw err;
                                                              });
                                                            }
                                                          });
                                                        });
                                                      }
                                                      console.log("Lee amperaje motor 3, linea 3");
                                                    } else {
                                                      if (val_sensor.indexOf("m4l1a") != -1) {
                                                        if (val_sensor.indexOf('=') != -1) {
                                                          var inicio = val_sensor.indexOf('=') + 1;
                                                          var longitud = val_sensor.length;
                                                          val_sensor = val_sensor.substring(inicio, longitud);
                                                          connection.query('INSERT INTO datos (valor, fk_sensor) VALUES ('+val_sensor+', (SELECT id_sensor FROM sensor WHERE nombre = "am_m4l1"))', function (error, results, fields) {
                                                            connection.commit(function(err) {
                                                              if (err) {
                                                                return connection.rollback(function() {
                                                                  throw err;
                                                                });
                                                              }
                                                            });
                                                          });
                                                        }
                                                        console.log("Lee amperaje motor 4, linea 1");
                                                      } else {
                                                        if (val_sensor.indexOf("m4l2a") != -1) {
                                                          if (val_sensor.indexOf('=') != -1) {
                                                            var inicio = val_sensor.indexOf('=') + 1;
                                                            var longitud = val_sensor.length;
                                                            val_sensor = val_sensor.substring(inicio, longitud);
                                                            connection.query('INSERT INTO datos (valor, fk_sensor) VALUES ('+val_sensor+', (SELECT id_sensor FROM sensor WHERE nombre = "am_m4l2"))', function (error, results, fields) {
                                                              connection.commit(function(err) {
                                                                if (err) {
                                                                  return connection.rollback(function() {
                                                                    throw err;
                                                                  });
                                                                }
                                                              });
                                                            });
                                                          }
                                                          console.log("Lee amperaje motor 4, linea 2");
                                                        } else {
                                                          if (val_sensor.indexOf("m4l3a") != -1) {
                                                            if (val_sensor.indexOf('=') != -1) {
                                                              var inicio = val_sensor.indexOf('=') + 1;
                                                              var longitud = val_sensor.length;
                                                              val_sensor = val_sensor.substring(inicio, longitud);
                                                              connection.query('INSERT INTO datos (valor, fk_sensor) VALUES ('+val_sensor+', (SELECT id_sensor FROM sensor WHERE nombre = "am_m4l3"))', function (error, results, fields) {
                                                                connection.commit(function(err) {
                                                                  if (err) {
                                                                    return connection.rollback(function() {
                                                                      throw err;
                                                                    });
                                                                  }
                                                                });
                                                              });
                                                            }
                                                            console.log("Lee amperaje motor 4, linea 3");
                                                          } else {
                                                            console.log("Format Exception");
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      //enviar();
      //val_sensor = parseInt(data, 10);
  });

  const server = http.createServer(requestHandler)
  server.listen(port, (err) => {
    if (err) {
      return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
  })

  port_serie.on('error', function(err) {
    console.log('Error: ', err.message);
  })
})


/*
  FUNCIONA LA CONSULTA
  connection.query('SELECT nombre, marcha, estado FROM actuador', function (error, results, fields) {
    if (error){
      console.log("A ocurrido un error: ", error);
    } else {
      console.log('Y el resultado es: ', results[0]);
    }
  });
*/


/*  NOTAS
    Para evitar una sobrecarga en la comunicación serial,
    cuando un controlador cambie de estado, por ejemplo el de los motores,
    si se deshabilita, a través de un trigger apagar todos los motores
    relacionados con él. También tener presente esto cuando a un controlador
    se le asigne un motor, si el controlador esta des habilitado, de una vez
    apagar los motores que se relacionan a éste.

    TAREAS PENDIENTES
    Implementar triggers para el requerimiento anterior

*/
