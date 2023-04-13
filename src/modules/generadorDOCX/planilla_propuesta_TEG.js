import * as docx from 'docx';
import file_saver from 'file-saver'
const { saveAs } = file_saver
// Load the full build.
import lodash from 'lodash';
const { _ } =  lodash;
const { TableRow,BorderStyle } = docx;
const { WidthType,Paragraph } = docx;
const { VerticalAlign, Document } = docx;
const { TextRun, AlignmentType } = docx;
const { SectionType, Header } = docx;
const { HeightRule,TableCell } = docx;
const { Footer, LineRuleType } = docx;
const { Table, PageBreak } = docx;
const { HeadingLevel,Packer } = docx;
//const { TableRow,BorderStyle } = docx;

import * as fs from 'fs'
const { writeFileSync } = fs;

const sin_bordes = {
    top: {
        style: BorderStyle.NONE,
        size: 1,
        color: "ff0000",
    },
    bottom: {
        style: BorderStyle.NONE,
        size: 1,
        color: "ff0000",
    },
    left: {
        style: BorderStyle.NONE,
        size: 1,
        color: "ff0000",
    },
    right: {
        style: BorderStyle.NONE,
        size: 1,
        color: "ff0000",
    }
}
const linea = {
    top: {
        style: BorderStyle.NONE,
        size: 1,
        color: "ff0000",
    },
    left: {
        style: BorderStyle.NONE,
        size: 1,
        color: "ff0000",
    },
    right: {
        style: BorderStyle.NONE,
        size: 1,
        color: "ff0000",
    }
}
const celda_vacia = new TableCell({
                        borders: linea,
                        children: [
                            new Paragraph({
                                text: " ",
                                style: "aside",
                            })
                        ],
                        width: {
                            size: 1000,
                            type: WidthType.DXA
                        }
                    });
function is_char(value)
{
    if (Object.prototype.toString.call(value) !== '[object String]')
     return false;
    return value && value.length === 1;
}
const tam_cuadro_titulo = 280;
const generar50Celdas = (titulo) => {
    const lista = []
    for (let j = 0; j < 50; j++){
            if(is_char(titulo[j])){

                let celda = new TableCell({
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: titulo[j]
                                })
                            ]
                        })
                    ],
                    width: {
                        size: tam_cuadro_titulo,
                        type: WidthType.DXA
                    },
                });

                lista.push(celda);
                
            }else{
                let celdaVacia = new TableCell({
                                    children: [],
                                    width: {
                                        size: tam_cuadro_titulo,
                                        type: WidthType.DXA
                                    },
                                 });
                lista.push(celdaVacia);           
            }

    }
    return lista;

}
const generarTituloOneHundred = (titulo) => {
    const rows = [];
    let mitad = 50
    let extraer = titulo.slice(0,50);
    let copia = titulo;
    for (let i = 0; i < 4; i++){
        let fila = new TableRow({
                children: generar50Celdas(extraer)
        })
        rows.push(fila);
        copia = titulo.slice(mitad, titulo.length);
        extraer = copia.slice(0,50)
        mitad=mitad+50;
    }
    return rows
}
//generarTituloOneHundred(titulo)

function convertProxyObjectToPojo(proxyObj) {
    return _.cloneDeep(proxyObj);
}
  
const generarDatosAlumno = ( object ) => {
                if(object !== undefined && !(Object.keys(object).length === 0)){
                    const pt = convertProxyObjectToPojo(object)
                    const resultado = new Paragraph({
                        style: "aside",
                        bullet: {
                            level: 0
                        },
                        children: [
                            new TextRun({
                                text: pt.apellidos + ', ' + pt.nombres  +" C.I.N. " + pt.cedula,
                                font: "Times New Roman",
                            })
                        ],
                        alignment: AlignmentType.JUSTIFIED,
                        spacing: {
                            line: 355,
                            lineRule: LineRuleType.AUTO,
                        }
                    })
                    return resultado
                }else{
                    const aux = new Paragraph({
                        children: [
                            new TextRun({
                                text: ""
                            })
                        ]
                    })
                    return aux;
                }
                
}

const encabezadoTablaAlumno = new TableRow({
    height: {
        value: 500, 
        rule: HeightRule.EXACT
    },
    children: [
        new TableCell({
            width: {
                size: 2700,
                type: WidthType.DXA
            },
            children: [
                new Paragraph({
                    style: "aside",
                    children: [
                        new TextRun({
                            text: "Nombre",
                            bold: true
                        }),
                    ],
                    alignment: AlignmentType.CENTER,
                })
            ],
            verticalAlign: VerticalAlign.CENTER,
        }),
        new TableCell({
            width: {
                size: 2000,
                type: WidthType.DXA
            },
            children: [
                new Paragraph({
                    style: "aside",
                    children: [
                        new TextRun({
                            text: "C.I.N",
                            bold: true
                        }),
                    ],
                    alignment: AlignmentType.CENTER,
                })
            ],
            verticalAlign: VerticalAlign.CENTER,
        }),
        new TableCell({
            width: {
                size: 2400,
                type: WidthType.DXA
            },
            children: [
                new Paragraph({
                    style: "aside",
                    children: [
                        new TextRun({
                            text: "Telefono",
                            bold: true
                        }),
                    ],
                    alignment: AlignmentType.CENTER,
                })
            ],
            verticalAlign: VerticalAlign.CENTER,
        }),
        new TableCell({
            width: {
                size: 2700,
                type: WidthType.DXA
            },
            children: [
                new Paragraph({
                    style: "aside",
                    children: [
                        new TextRun({
                            text: "Email",
                            bold: true
                        }),
                    ],
                    alignment: AlignmentType.CENTER,
                })
            ],
            verticalAlign: VerticalAlign.CENTER,
        }),
    ]
})
const generarNombresAlumno = ( object ) => {
    console.log("generarNombresAlumno()");
    console.log(object);
    console.log(object.nombres);
    console.log(object.apellidos);
    if(object !== undefined && !(Object.keys(object).length === 0)){
        const fila = new TableRow({
                        height: {
                            value: 500, 
                            rule: HeightRule.EXACT
                        },
                        children : [
                            new TableCell({
                                borders: sin_bordes,
                                children: [
                                    new Paragraph({
                                        style: "aside",
                                        children: [
                                            new TextRun({
                                                text: "Nombre de alumno",
                                                bold: true
                                            })
                                        ],
                                        alignment: AlignmentType.LEFT
                                    })
                                ],
                                verticalAlign: VerticalAlign.CENTER,
                            }),
                            new TableCell({
                                borders: sin_bordes,
                                children: [
                                    new Paragraph({
                                        style: "aside",
                                        children: [
                                            new TextRun({
                                                text: object.apellidos + ', ' + object.nombres,
                                            })
                                        ],
                                        alignment: AlignmentType.LEFT
                                    })
                                ],
                                verticalAlign: VerticalAlign.CENTER
                            })
                        ]
                    });
                    return fila;

    }else{
        
        const fila = new TableRow({
                        children: [
                            new TableCell({
                                borders: sin_bordes,
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: ""
                                            })
                                        ]
                                    })
                                ]
                            }),
                            new TableCell({
                                borders: sin_bordes,
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: ""
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
        return fila;

    }

}
const generarFilaAlumno = (planilla_propuesta_TEG) => {
    console.log("generarFilaAlumno()");
    console.log(planilla_propuesta_TEG);
    const filas = [];
    filas.push(encabezadoTablaAlumno);
    planilla_propuesta_TEG.alumnos.forEach( (element) => {
        if(element !== undefined && !(Object.keys(element).length === 0)){
            const fila = new TableRow({
                height: {
                    value: 500, 
                    rule: HeightRule.EXACT
                },
                children: [
                    new TableCell({
                        width: {
                            size: 500,
                            type: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                style: "aside",
                                children: [
                                    new TextRun({
                                        text: element.apellidos + ', ' + element.nombres
                                    }),
                                ],
                                alignment: AlignmentType.CENTER
                            })
                        ],
                        verticalAlign: VerticalAlign.CENTER,
                    }),
                    new TableCell({
                        width: {
                            size: 500,
                            type: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                style: "aside",
                                children: [
                                    new TextRun({
                                        text: element.cedula
                                    }),
                                ],
                                alignment: AlignmentType.CENTER
                            })
                        ],
                        verticalAlign: VerticalAlign.CENTER,
                    }),
                    new TableCell({
                        width: {
                            size: 500,
                            type: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                style: "aside",
                                children: [
                                    new TextRun({
                                        text: element.telefono
                                    }),
                                ],
                                alignment: AlignmentType.CENTER
                            })
                        ],
                        verticalAlign: VerticalAlign.CENTER,
                    }),
                    new TableCell({
                        width: {
                            size: 500,
                            type: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                style: "aside",
                                children: [
                                    new TextRun({
                                        text: element.email
                                    }),
                                ]
                            })
                        ],
                        verticalAlign: VerticalAlign.CENTER,
                    })
                ]
            });
            filas.push(fila);
        }else{
            const fila =
            new TableRow({
                height: {
                    value: 500, 
                    rule: HeightRule.EXACT
                },
                children: [
                    new TableCell({
                        borders: sin_bordes,
                        width: {
                            size: 500,
                            type: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                style: "aside",
                                children: [],
                                alignment: AlignmentType.CENTER
                            })
                        ],
                        verticalAlign: VerticalAlign.CENTER,
                    }),
                    new TableCell({
                        borders: sin_bordes,
                        width: {
                            size: 500,
                            type: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                style: "aside",
                                children: [],
                                alignment: AlignmentType.CENTER
                            })
                        ],
                        verticalAlign: VerticalAlign.CENTER,
                    }),
                    new TableCell({
                        borders: sin_bordes,
                        width: {
                            size: 500,
                            type: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                style: "aside",
                                children: [],
                                alignment: AlignmentType.CENTER
                            })
                        ],
                        verticalAlign: VerticalAlign.CENTER,
                    }),
                    new TableCell({
                        borders: sin_bordes,
                        width: {
                            size: 500,
                            type: WidthType.DXA
                        },
                        children: [
                            new Paragraph({
                                style: "aside",
                                children: []
                            })
                        ],
                        verticalAlign: VerticalAlign.CENTER,
                    })
                ]
            });
            filas.push(fila)
        }
    })
    return filas;
}
const generarDatosAlumno2 = (object) => {
    if(object !== undefined && !(Object.keys(object).length === 0)){
        const parrafo = new Paragraph({
                                style: "aside",
                                children:[ 
                                    new TextRun({
                                        text: "Datos Alumno 2",
                                        bold: true
                                    })
                                ],
                                spacing: {
                                    after: 200,
                                    before: 200,
                                    line: 355,
                                    lineRule: LineRuleType.AUTO,
                                }
                        });
        return parrafo
    }
    const parrafo = new Paragraph({
                    style: "aside",
                    children:[ 
                        new TextRun({
                            text: ""
                        })
                    ],
                    spacing: {
                        after: 200,
                        before: 200,
                        line: 355,
                        lineRule: LineRuleType.AUTO,
                    }
                });
    return parrafo;
}
const generarTablaDatosAlumno = (object) => {

    if(object !== undefined && !(Object.keys(object).length === 0)){
        const tablaAlumno = [
            new TableRow({
                height: {
                    value: 500, 
                    rule: HeightRule.EXACT
                },
                children: [
                    new TableCell({
                            borders: sin_bordes,
                            children: [
                                new Paragraph({
                                    text: "Nombre",
                                    style: "aside",
                                    alignment: AlignmentType.CENTER
                                })
                            ],
                            width: {
                                size: 1000,
                                type: WidthType.DXA
                            },
                            verticalAlign: VerticalAlign.CENTER
                    }),
                    new TableCell({
                            borders: linea,
                            children: [
                                new Paragraph({
                                    style: "aside",
                                    text: object.apellidos + ', ' + object.nombres,
                                    alignment: AlignmentType.LEFT
                                })
                            ],
                            width: {
                                size: 1000,
                                type: WidthType.DXA
                            },
                            verticalAlign: VerticalAlign.CENTER
                    }),
                    celda_vacia,
                    celda_vacia,
                    celda_vacia,
                    celda_vacia
                ]
            }),
            new TableRow({
                height: {
                    value: 500, 
                    rule: HeightRule.EXACT
                },
                children: [
                    new TableCell({
                            borders: sin_bordes,
                            children: [
                                new Paragraph({
                                    style: "aside",
                                    text: "C.I.N",
                                    alignment: AlignmentType.CENTER
                                })
                            ],
                            width: {
                                size: 1000,
                                type: WidthType.DXA
                            },
                            verticalAlign: VerticalAlign.CENTER
                        }),
                    new TableCell({
                            borders: linea,
                            children: [
                                new Paragraph({
                                    style: "aside",
                                    text: object.cedula,
                                    alignment: AlignmentType.LEFT
                                })
                            ],
                            width: {
                                size: 1000,
                                type: WidthType.DXA
                            },
                            verticalAlign: VerticalAlign.CENTER
                    }),
                    celda_vacia,
                    celda_vacia,
                    celda_vacia,
                    celda_vacia
                ]
            }),
            new TableRow({
                height: {
                    value: 500, 
                    rule: HeightRule.EXACT
                },
                children: [
                    new TableCell({
                            borders: sin_bordes,
                            children: [
                                new Paragraph({
                                    style: "aside",
                                    text: "E-mail",
                                    alignment: AlignmentType.CENTER
                                })
                            ],
                            width: {
                                size: 1000,
                                type: WidthType.DXA
                            },
                            verticalAlign: VerticalAlign.CENTER
                        }),
                    new TableCell({
                            borders: linea,
                            children: [
                                new Paragraph({
                                    text: object.email,
                                    style: "aside",
                                    alignment: AlignmentType.LEFT
                                })
                            ],
                            width: {
                                size: 1000,
                                type: WidthType.DXA
                            },
                            verticalAlign: VerticalAlign.CENTER
                    }),
                    celda_vacia,
                    celda_vacia,
                    celda_vacia,
                    celda_vacia
                ]
            }),
            new TableRow({
                height: {
                    value: 500, 
                    rule: HeightRule.EXACT
                },
                children: [
                    new TableCell({
                            borders: sin_bordes,
                            children: [
                                new Paragraph({
                                    style: "aside",
                                    text: "Telefonos",
                                    alignment: AlignmentType.CENTER
                                })
                            ],
                            width: {
                                size: 1000,
                                type: WidthType.DXA
                            },
                            verticalAlign: VerticalAlign.CENTER
                    }),
                    new TableCell({
                            borders: linea,
                            children: [
                                new Paragraph({
                                    text: object.telefono,
                                    style: "aside",
                                    alignment: AlignmentType.LEFT
                                })
                            ],
                            width: {
                                size: 500,
                                type: WidthType.DXA
                            },
                            verticalAlign: VerticalAlign.CENTER
                    }),
                    new TableCell({
                        borders: linea,
                        children: [
                            new Paragraph({
                                text: "Oficina",
                                style: "aside",
                                alignment: AlignmentType.CENTER
                            })
                        ],
                        width: {
                            size: 1000,
                            type: WidthType.DXA
                        },
                        verticalAlign: VerticalAlign.CENTER
                    }),
                    new TableCell({
                        borders: linea,
                        children: [
                            new Paragraph({
                                text: object.oficina,
                                style: "aside",
                                alignment: AlignmentType.LEFT
                            })
                        ],
                        width: {
                            size: 2000,
                            type: WidthType.DXA
                        },
                        verticalAlign: VerticalAlign.CENTER
                    }),
                    new TableCell({
                        borders: linea,
                        children: [
                            new Paragraph({
                                text: "Habitacion",
                                style: "aside",
                                alignment: AlignmentType.CENTER
                            })
                        ],
                        width: {
                            size: 1000,
                            type: WidthType.DXA
                        },
                        verticalAlign: VerticalAlign.CENTER
                    }),
                    new TableCell({
                        borders: linea,
                        children: [
                            new Paragraph({
                                text: object.habitacion,
                                style: "aside",
                                alignment: AlignmentType.LEFT
                            })
                        ],
                        width: {
                            size: 2000,
                            type: WidthType.DXA
                        },
                        verticalAlign: VerticalAlign.CENTER
                    }),
                ]
            }),
        ]
        return tablaAlumno;
    }
    const tablaAlumno = [ 
                            new TableRow({
                                children: [
                                    new TableCell({
                                        borders: sin_bordes,
                                        children: []
                                    })
                                ]
                            })
                        ]
    return tablaAlumno;
            

}
export const generarPlanillaPropuestaTEG = (planilla_propuesta_TEG) => {
    console.log("planilla_propuesta_TEG")
    /* Validamos si la cantidad de experiencia del tutor es nula o '0' */
    let tutor_experiencia;
    let fecha_graduado;
    if(planilla_propuesta_TEG.tutor_academico.experiencia == null || planilla_propuesta_TEG.tutor_academico.experiencia == 0){
        tutor_experiencia = 'No tiene experiencia'
    }else{
        tutor_experiencia = planilla_propuesta_TEG.tutor_academico.experiencia
    }

    if(planilla_propuesta_TEG.tutor_academico.fecha_graduado == null ){
        fecha_graduado = "No tiene fecha de graduado"
    }else{
        fecha_graduado = planilla_propuesta_TEG.tutor_academico.fecha_graduado
    }
    console.log(planilla_propuesta_TEG)
    const doc = new Document({
        creator: "Luis C. Somoza & Wladimir SanVicente",
        title: "Planilla de propuesta de TEG",
        description: "Planilla de propuesta de TEG",
        styles: {
            default: {
                heading1: {
                    run: {
                        size: 23,
                        bold: true,
                    },
                    paragraph: {
                        spacing: {
                            after: 200,
                        },
                        alignment: AlignmentType.CENTER,
                    },
                },
            },
            paragraphStyles: [
                {
                    id: "aside",
                    name: "Aside",
                    basedOn: "Normal",
                    next: "Normal",
                    run: {
                        size: 22,
                    },
                    paragraph: {
                        spacing: {
                            line: 200,
                        },
                    },
                }
            ]
        },
        sections: [{
            properties: {
                type: SectionType.CONTINUOUS,
                margin: {
                    right: 150,
                    bottom: 150,
                    left: 150,
                }
            },
            headers: {
                default: new Header({
                    children: [new Paragraph({
                        children: [
                            /*
                            new ImageRun({
                                data: readFileSync('logo.png'),
                                transformation: {
                                    width: 400,
                                    height: 100,
                                },
                            }),
                            */
                        ],
                        alignment: AlignmentType.LEFT
                    })],
                }),
            },
            footers: {
                default: new Footer({
                    children: [
                        new Paragraph({
                            children: [
                                /*
                                new ImageRun({
                                    data: readFileSync('Untitled.png'),
                                    transformation: {
                                        width: 600,
                                        height: 15,
                                    },
                                    alignment: AlignmentType.CENTER
                                }),
                                */
                            ],
                            alignment: AlignmentType.CENTER
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: "UNIVERSIDAD CATÓLICA ANDRÉS BELLO – Extensión Guayana",
                                })
                            ],
                            alignment: AlignmentType.CENTER
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: "Avenida Atlántico, Ciudad Guayana 8050",
                                })
                            ],
                            alignment: AlignmentType.CENTER
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: "Bolívar, Venezuela. Teléfono: +58-286-6000111"
                                })
                            ],
                            alignment: AlignmentType.CENTER
                        }),
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: "URL: http://www.guayanaweb.ucab.edu.ve/escuela-de-ingenieria-informatica.html"
                                })
                            ],
                            alignment: AlignmentType.CENTER
                        })
                    ],
                }),
            },
            children: [
                new Paragraph({
                    style: "aside",
                    children: [
                        new TextRun({
                            text: 'Ciudad Guayana, ' + planilla_propuesta_TEG.fecha_envio.toLocaleDateString(),
                            font: "Times New Roman",
                        })
                    ],
                    alignment: AlignmentType.RIGHT,
                    spacing: {
                        after: 100,
                        line: 355,
                        lineRule: LineRuleType.AUTO,
                    },
                }),
                new Paragraph({
                    style: "aside",
                    children: [
                        new TextRun({
                            text: 'Señores',
                            font: "Times New Roman",
                        }),
                    ],
                    spacing: {
                        after: 100,
                        line: 355,
                        lineRule: LineRuleType.AUTO,
                    }
                }),    
                new Paragraph({
                    style: "aside",
                    children: [
                        new TextRun({
                            text: 'Consejo de Escuela de Ingenieria Informatica',
                            font: "Times New Roman",
                        }),
                    ],
                    spacing: {
                        after: 100,
                        line: 355,
                        lineRule: LineRuleType.AUTO,
                    }
                }),
                new Paragraph({
                    style: "aside",
                    children: [
                        new TextRun({
                            text: 'Facultad de Ingenieria',
                            font: "Times New Roman",
                        }),
                    ],
                    spacing: {
                        after: 100,
                        line: 355,
                        lineRule: LineRuleType.AUTO,
                    }
                }),
                new Paragraph({
                    style: "aside",
                    children: [
                        new TextRun({
                            text: 'Universidad Catolica Andres Bello',
                            font: "Times New Roman",
                        }),
                    ],
                    spacing: {
                        after: 100,
                        line: 355,
                        lineRule: LineRuleType.AUTO,
                    }
                }),
                new Paragraph({
                    style: "aside",
                    children: [
                        new TextRun({
                            text: 'Presente. -',
                            font: "Times New Roman",
                        }),
                    ],
                    spacing: {
                        after: 200,
                        line: 355,
                        lineRule: LineRuleType.AUTO,
                    }
                }),
                new Paragraph({
                    style: "aside",
                    children: [
                        new TextRun({
                            text: "Por medio de la presente hago constar que estoy dispuesto a supervisar, en calidad de Tutor Académico el Trabajo Experimental de Grado (TEG) titulado: " + '"'+planilla_propuesta_TEG.titulo+'", que será desarrollado por el (los) alumno(s):',
                            font: "Times New Roman",
                        })
                    ],
                    alignment: AlignmentType.JUSTIFIED,
                    indent: {
                        firstLine: 400
                    },
                    spacing: {
                        after: 100,
                        line: 355,
                        lineRule: LineRuleType.AUTO,
                    }
                }),
                //Aqui se imprimen los los alumnos y sus datos
                generarDatosAlumno(planilla_propuesta_TEG.alumnos[0]),
                generarDatosAlumno(planilla_propuesta_TEG.alumnos[1]),
                new Paragraph({
                    style: "aside",
                    children: [
                        new TextRun({
                            text: "Para lo cual solicito la aprobación de este Consejo de Escuela. Así mismo hago constar que he leído el extracto con la descripción de las funciones del Tutor y estoy conforme con la responsabilidad que me corresponde asumir.",
                            font: "Times New Roman",
                        })
                    ],
                    alignment: AlignmentType.JUSTIFIED,
                    spacing: {
                        after: 200,
                        line: 355,
                        lineRule: LineRuleType.AUTO,
                    }
                }),
                new Paragraph({
                    style: "aside",
                    children: [
                        new TextRun({
                            text: "Atentamente, ",
                            font: "Times New Roman",
                        })
                    ],
                    spacing: {
                        after: 25,
                        line: 355,
                        lineRule: LineRuleType.AUTO,
                    }
                }),
                //INSERTAMOS TABLA DE DATOS DE TUTOR ACADEMICO AQUI
                new Table({
                    columnWidths: [3000, 4500],
                    rows: [
                        new TableRow({
                            height: {
                                value: 500, 
                                rule: HeightRule.EXACT
                            },
                            children : [
                                new TableCell({
                                    borders: sin_bordes,
                                    width: {
                                        size: 1000,
                                        type: WidthType.DXA
                                    },
                                    children: [],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    borders: {
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        right: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    width: {
                                        size: 10000,
                                        type: WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "       Tutor Academico",
                                                    bold: true,
                                                })
                                            ],
                                            alignment: AlignmentType.LEFT
                                        })
                                    ]
                                }),
                            ]
                        }),
                        new TableRow({
                            height: {
                                value: 500, 
                                rule: HeightRule.EXACT
                            },
                            children : [
                                new TableCell({
                                    borders: sin_bordes,
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "Nombre",
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    borders: {
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        right: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            borders: {
                                                top: {
                                                    style: BorderStyle.NONE,
                                                    size: 1,
                                                    color: "ff0000",
                                                },
                                                left: {
                                                    style: BorderStyle.NONE,
                                                    size: 1,
                                                    color: "ff0000",
                                                },
                                                right: {
                                                    style: BorderStyle.NONE,
                                                    size: 1,
                                                    color: "ff0000",
                                                }
                                            },
                                            children: [
                                                new TextRun({
                                                    text: planilla_propuesta_TEG.tutor_academico.nombres,
                                                })
                                            ],
                                            alignment: AlignmentType.LEFT
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                })
                            ]
                        }),
                        new TableRow({
                            height: {
                                value: 500, 
                                rule: HeightRule.EXACT
                            },
                            children : [
                                new TableCell({
                                    borders: sin_bordes,
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "C.I.N",
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    borders: {
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        right: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: planilla_propuesta_TEG.tutor_academico.cedula,
                                                })
                                            ],
                                            alignment: AlignmentType.LEFT
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER
                                }),
                            ]
                        }),
                        new TableRow({
                            height: {
                                value: 500, 
                                rule: HeightRule.EXACT
                            },
                            children : [
                                new TableCell({
                                    borders: sin_bordes,
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "Email",
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    borders: {
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        right: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: planilla_propuesta_TEG.tutor_academico.email,
                                                })
                                            ],
                                            alignment: AlignmentType.LEFT
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER
                                })
                            ]
                        }),
                        new TableRow({
                            height: {
                                value: 500, 
                                rule: HeightRule.EXACT
                            },
                            children : [
                                new TableCell({
                                    borders: sin_bordes,
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "Telefono",
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    borders: {
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        right: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            borders: {
                                                top: {
                                                    style: BorderStyle.NONE,
                                                    size: 1,
                                                    color: "ff0000",
                                                },
                                                left: {
                                                    style: BorderStyle.NONE,
                                                    size: 1,
                                                    color: "ff0000",
                                                },
                                                right: {
                                                    style: BorderStyle.NONE,
                                                    size: 1,
                                                    color: "ff0000",
                                                }
                                            },
                                            children: [
                                                new TextRun({
                                                    text: planilla_propuesta_TEG.tutor_academico.telefono,
                                                })
                                            ],
                                            alignment: AlignmentType.LEFT
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER
                                })
                            ]
                        }),
                        new TableRow({
                            height: {
                                value: 500, 
                                rule: HeightRule.EXACT
                            },
                            children : [
                                new TableCell({
                                    borders: sin_bordes,
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "Fecha",
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    borders: {
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        right: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: new Date().toLocaleDateString(),
                                                })
                                            ],
                                            alignment: AlignmentType.LEFT
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER
                                })
                            ]
                        }),
                    ]
                }),
                ///////////////////////////////////////////////////
                ///////////////////////////////////////////////////
                ///////////////////////////////////////////////////
                new Paragraph({
                    style: "aside",
                    children: [
                        new TextRun({
                            text: ""
                        })
                    ],
                    spacing: {
                        before: 200,
                        after: 100,
                        line: 355,
                        lineRule: LineRuleType.AUTO,
                    }
                }),
                ///////////////////////////////////////////////////
                //////////////INSERTAMOS TABLA PARA FIRMA///////////
                ///////////////////////////////////////////////////
                new Table({
                    columnWidths: [3000, 4500],
                    indent: {
                        size: 5500,
                        type: WidthType.DXA,
                    },
                    rows: [
                        new TableRow({
                            height: {
                                value: 500, 
                                rule: HeightRule.EXACT
                            },
                            children: [
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "Firma"
                                                }),
                                            ]
                                        })
                                    ],
                                    borders: {
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        bottom: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        right: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: ""
                                                }),
                                            ]
                                        })
                                    ],
                                    borders: {
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        right: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    width: {
                                        size: 3000,
                                        type: WidthType.DXA
                                    },
                                }),
                            ]
                        }),
                    ],
                }),
                ///////////////////////////////////////////////////
                ///////////////////////////////////////////////////
                ///////////////////////////////////////////////////
                //Salto de página
                new Paragraph({
                    children:[ new PageBreak()]
                }),
                new Paragraph({
                    heading: HeadingLevel.HEADING_1,
                    children:[ 
                        new TextRun({
                            text: "PLANILLA RESUMEN DE DATOS DE LA PROPUESTA DE TEG "
                        })
                    ]
                }),
                new Paragraph({
                    style: "aside",
                    children:[ 
                        new TextRun({
                            text: "Tema Propuesto: ",
                            bold: true
                        }),
                        new TextRun({
                            text: "<no debe exceder los 200 caracteres y debe colocar cada carácter en una casilla>"
                        })
                    ],
                    spacing: {
                        after: 200,
                        line: 355,
                        lineRule: LineRuleType.AUTO,
                    }
                }),
                //Aqui se tiene que insertar la tabla 50 x 4 y extraer letra a letra el titulo
                new Table({
                    rows: generarTituloOneHundred(planilla_propuesta_TEG.titulo)
                }),
                //////////////////////////////////////////////////////////////////////////////
                new Paragraph({
                    style: "aside",
                    children:[ 
                        new TextRun({
                            text: "Organización donde desarrollará el TEG: ",
                            bold: true
                        })
                    ],
                    spacing: {
                        before: 200,
                        after: 200,
                        line: 355,
                        lineRule: LineRuleType.AUTO,
                    }
                }),
                new Table({
                    columnWidths: [3000, 4500],
                    rows: [
                        new TableRow({
                            height: {
                                value: 500, 
                                rule: HeightRule.EXACT
                            },
                            children: [
                                new TableCell({
                                    width: {
                                        size: 10000,
                                        type: WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: planilla_propuesta_TEG.organizacion
                                                }),
                                            ]
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                            ]
                        }),
                    ],
                }),
                new Paragraph({
                    style: "aside",
                    children: [
                        new TextRun({
                            text: ""
                        })
                    ],
                    spacing: {
                        after: 200,
                        before: 200
                    }
                }),
                //Seccion de datos de alumno
                new Paragraph({
                    style: "aside",
                    children: [
                        new TextRun({
                            text: "Datos de los Alumnos: ",
                            bold: true
                        })
                    ],
                    spacing: {
                        after: 200,
                        line: 355,
                        lineRule: LineRuleType.AUTO,
                    }
                }),
                new Table({
                    columnWidths: [3000, 4500],
                    rows: generarFilaAlumno(planilla_propuesta_TEG)
                }),
                new Paragraph({
                    style: "aside",
                    children: [
                        new TextRun({
                            text: ""
                        })
                    ],
                    spacing: {
                        after: 200,
                        before: 200
                    }
                }),
                new Paragraph({
                    style: "aside",
                    children: [
                        new TextRun({
                            text: "Datos del Tutor Académico:",
                            bold: true
                        })
                    ],
                    spacing: {
                        after: 200,
                        line: 355,
                        lineRule: LineRuleType.AUTO,
                    }
                }),
                //Datos de tutor academico
                new Table({
                    columnWidths: [3000, 4500],
                    rows: [
                        new TableRow({
                            height: {
                                value: 500, 
                                rule: HeightRule.EXACT
                            },
                            children : [
                                new TableCell({
                                    borders: sin_bordes,
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "Nombre",
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    borders: {
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        right: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: planilla_propuesta_TEG.tutor_academico.nombres,
                                                })
                                            ],
                                            alignment: AlignmentType.LEFT
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER
                                })
                            ]
                        }),
                        new TableRow({
                            height: {
                                value: 500, 
                                rule: HeightRule.EXACT
                            },
                            children : [
                                new TableCell({
                                    borders: sin_bordes,
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "C.I.N",
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    borders: {
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        right: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: planilla_propuesta_TEG.tutor_academico.cedula,
                                                })
                                            ],
                                            alignment: AlignmentType.LEFT
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER
                                })
                            ]
                        }),
                        new TableRow({
                            height: {
                                value: 500, 
                                rule: HeightRule.EXACT
                            },
                            children : [
                                new TableCell({
                                    borders: sin_bordes,
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "Profesion",
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    borders: {
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        right: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: planilla_propuesta_TEG.tutor_academico.profesion,
                                                })
                                            ],
                                            alignment: AlignmentType.LEFT
                                        })
                                    ],
                                    width: {
                                        size: 10000,
                                        type: WidthType.DXA
                                    },
                                    verticalAlign: VerticalAlign.CENTER
                                })
                            ]
                        }),
                        new TableRow({
                            height: {
                                value: 500, 
                                rule: HeightRule.EXACT
                            },
                            children : [
                                new TableCell({
                                    borders: sin_bordes,
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "Años de experiencia",
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    borders: {
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        right: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "   " + tutor_experiencia.toString(),
                                                })
                                            ],
                                            alignment: AlignmentType.LEFT
                                            
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                    width: {
                                        size: 10000,
                                        type: WidthType.DXA
                                    },
                                }),
                            ]
                        }),
                        new TableRow({
                            height: {
                                value: 500, 
                                rule: HeightRule.EXACT
                            },
                            children : [
                                new TableCell({
                                    borders: sin_bordes,
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "Cargo Actual",
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    borders: {
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        right: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: planilla_propuesta_TEG.tutor_academico.cargo,
                                                })
                                            ],
                                            alignment: AlignmentType.LEFT
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                    width: {
                                        size: 10000,
                                        type: WidthType.DXA
                                    },
                                })
                            ]
                        }),
                        new TableRow({
                            height: {
                                value: 500, 
                                rule: HeightRule.EXACT
                            },
                            children : [
                                new TableCell({
                                    borders: sin_bordes,
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "Email",
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    borders: {
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        right: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: planilla_propuesta_TEG.tutor_academico.email,
                                                })
                                            ],
                                            alignment: AlignmentType.LEFT
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                    width: {
                                        size: 10000,
                                        type: WidthType.DXA
                                    },
                                })
                            ]
                        }),
                        new TableRow({
                            height: {
                                value: 500, 
                                rule: HeightRule.EXACT
                            },
                            children : [
                                new TableCell({
                                    borders: sin_bordes,
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "Telefono",
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    borders: {
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        right: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: planilla_propuesta_TEG.tutor_academico.telefono,
                                                })
                                            ],
                                            alignment: AlignmentType.LEFT
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                    width: {
                                        size: 10000,
                                        type: WidthType.DXA
                                    },
                                })
                            ]
                        }),
                    ]
                }),
                /////////////////////////////////////////////////////////////////////////////////////
                new Paragraph({
                    children:[ new PageBreak()]
                }),
                new Paragraph({
                    style: "aside",
                    children:[ 
                        new TextRun({
                            text: "Datos Alumno 1",
                            bold: true
                        })
                    ],
                    spacing: {
                        after: 200,
                        line: 355,
                        lineRule: LineRuleType.AUTO,
                    }
                }),
                new Table({
                    width: {
                        size: 9000,
                        type: WidthType.DXA,
                    },
                    //Inserte tabla de alumnos aqui
                    rows: generarTablaDatosAlumno(planilla_propuesta_TEG.alumnos[0])
                                      
                  
                }),
                generarDatosAlumno2(planilla_propuesta_TEG.alumnos[1]),
                new Table({
                    width: {
                        size: 9000,
                        type: WidthType.DXA,
                    },
                    //Inserte tabla de alumnos aqui
                    rows: generarTablaDatosAlumno(planilla_propuesta_TEG.alumnos[1])
                                      
                  
                }),
                new Paragraph({
                    style: "aside",
                    children:[ 
                        new TextRun({
                            text: ""
                        })
                    ],
                    spacing: {
                        before: 200,
                        after: 200
                    }
                }),
                new Paragraph({
                    style: "aside",
                    children:[ 
                        new TextRun({
                            text: "Datos Tutor Academico",
                            bold: true
                        })
                    ],
                    spacing: {
                        before: 200,
                        after: 200
                    }
                }),
                new Table({
                    columnWidths: [3000, 4500],
                    rows: [
                        new TableRow({
                            height: {
                                value: 500, 
                                rule: HeightRule.EXACT
                            },
                            children : [
                                new TableCell({
                                    borders: sin_bordes,
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "Nombre",
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    borders: linea,
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: planilla_propuesta_TEG.tutor_academico.nombres,
                                                })
                                            ],
                                            style: "aside",
                                            alignment: AlignmentType.LEFT
                                            
                                        }),
                                    ],
                                    width: {
                                        size: 10000,
                                        type: WidthType.DXA
                                    },
                                    verticalAlign: VerticalAlign.CENTER
                                }),               
                                celda_vacia,
                                celda_vacia,
                                celda_vacia
                            ]
                        }),
                        new TableRow({
                            height: {
                                value: 500, 
                                rule: HeightRule.EXACT
                            },
                            children : [
                                new TableCell({
                                    borders: sin_bordes,
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "C.I.N",
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    borders: linea,
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: planilla_propuesta_TEG.tutor_academico.cedula,
                                                })
                                            ],
                                            style: "aside",
                                            alignment: AlignmentType.LEFT
                                            
                                        }),
                                    ],
                                    width: {
                                        size: 10000,
                                        type: WidthType.DXA
                                    },
                                    verticalAlign: VerticalAlign.CENTER
                                }),
                                celda_vacia,
                                celda_vacia,
                                celda_vacia
                            ]
                        }),
                        new TableRow({
                            height: {
                                value: 500, 
                                rule: HeightRule.EXACT
                            },
                            children : [
                                new TableCell({
                                    borders: sin_bordes,
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "Telefonos   ",
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    borders: linea,
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: planilla_propuesta_TEG.tutor_academico.telefono,
                                                })
                                            ],
                                            style: "aside",
                                            alignment: AlignmentType.LEFT
                                        }),
                                    ],
                                    width: {
                                        size: 10000,
                                        type: WidthType.DXA
                                    },
                                    verticalAlign: VerticalAlign.CENTER
                                }),
                                new TableCell({
                                    borders: linea,
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Oficina",
                                                })
                                            ],
                                            style: "aside",
                                            alignment: AlignmentType.LEFT   
                                        }),
                                    ],
                                    verticalAlign: VerticalAlign.CENTER
                                }),
                                new TableCell({
                                    borders: linea,
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: planilla_propuesta_TEG.tutor_academico.oficina,
                                                })
                                            ],
                                            style: "aside",
                                            alignment: AlignmentType.LEFT
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER
                                }),
                                new TableCell({
                                    borders: linea,
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Habitación",
                                                })
                                            ],
                                            style: "aside",
                                            alignment: AlignmentType.LEFT
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    borders: linea,
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: planilla_propuesta_TEG.tutor_academico.habitacion,
                                                })
                                            ],
                                            alignment: AlignmentType.LEFT,
                                            style: "aside"
                                        }),
                                    ],
                                    verticalAlign: VerticalAlign.CENTER
                                }),
                            ]
                        }),
                        new TableRow({
                            height: {
                                value: 500, 
                                rule: HeightRule.EXACT
                            },
                            children : [
                                new TableCell({
                                    borders: sin_bordes,
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "Email",
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    borders: linea,
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: planilla_propuesta_TEG.tutor_academico.email,
                                                })
                                            ],
                                            alignment: AlignmentType.LEFT,
                                            style: "aside"
                                        }),
                                    ],
                                    width: {
                                        size: 10000,
                                        type: WidthType.DXA
                                    },
                                    verticalAlign: VerticalAlign.CENTER
                                }),
                                celda_vacia,
                                celda_vacia,
                                celda_vacia
                            ]
                        }),
                        new TableRow({
                            height: {
                                value: 500, 
                                rule: HeightRule.EXACT
                            },
                            children : [
                                new TableCell({
                                    borders: sin_bordes,
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "Cargo",
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    borders: linea,
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: planilla_propuesta_TEG.tutor_academico.cargo,
                                                })
                                            ],
                                            style: "aside",
                                            alignment: AlignmentType.LEFT
                                        }),
                                    ],
                                    verticalAlign: VerticalAlign.CENTER
                                }),
                                celda_vacia,
                                celda_vacia,
                                celda_vacia
                            ]
                        }),
                        new TableRow({
                            height: {
                                value: 500, 
                                rule: HeightRule.EXACT
                            },
                            children : [
                                new TableCell({
                                    borders: sin_bordes,
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "Fecha de graduado",
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    borders: linea,
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: fecha_graduado.toString(),
                                                })
                                            ],
                                            style: "aside",
                                            alignment: AlignmentType.LEFT
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER
                                }),
                                new TableCell({
                                    borders: linea,
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ],
                                            
                                        })
                                    ]
                                }),
                                new TableCell({
                                    borders: linea,
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Tutor TG",
                                                })
                                            ],
                                            alignment: AlignmentType.LEFT   
                                        }),
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                    width: {
                                        size: 10000,
                                        type: WidthType.DXA
                                    },
                                }),
                                new TableCell({
                                    borders: linea,
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "SI",
                                                    bold: true
                                                })
                                            ],
                                            style: "aside",
                                            alignment: AlignmentType.LEFT
                                        }),
                                    ],
                                    verticalAlign: VerticalAlign.CENTER
                                }),
                            ]
                        }),
                        new TableRow({
                            height: {
                                value: 500, 
                                rule: HeightRule.EXACT
                            },
                            children : [
                                new TableCell({
                                    borders: sin_bordes,
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "Profesor UCAB",
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    borders: linea,
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "SI",
                                                    bold: true
                                                })
                                            ],
                                            alignment: AlignmentType.LEFT
                                            
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER

                                }),
                                celda_vacia,
                                celda_vacia,
                                celda_vacia
                            ]
                        }),
                        
                    ]
                }),
                new Paragraph({
                    children:[ new PageBreak()]
                }),
                new Paragraph({
                    children:[ 
                        new TextRun({
                            text: "Datos de la Empresa:",
                            bold: true
                    
                        })
                    ],
                    spacing: {
                        after: 200
                    },
                    style: "aside",
                    alignment: AlignmentType.CENTER
                }),
                new Table({
                    rows: [
                        new TableRow({
                            height: {
                                value: 500, 
                                rule: HeightRule.EXACT
                            },
                            children : [
                                new TableCell({
                                    borders: sin_bordes,
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "Nombre",
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    borders: linea,
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: planilla_propuesta_TEG.empresa.nombre,
                                                })
                                            ],
                                            alignment: AlignmentType.LEFT,
                                            indent: {
                                                firstLine: 300,
                                                size: 300,
                                                type: WidthType.DXA,
                                            }
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER
                                }),
                                celda_vacia,
                                celda_vacia,
                                celda_vacia,
                                celda_vacia,
                                celda_vacia,
                                celda_vacia
                            ]
                        }),
                        new TableRow({
                            height: {
                                value: 500, 
                                rule: HeightRule.EXACT
                            },
                            children : [
                                new TableCell({
                                    borders: sin_bordes,
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "Dirección",
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    borders: linea,
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: planilla_propuesta_TEG.empresa.direccion,
                                                })
                                            ],
                                            style: "aside",
                                            alignment: AlignmentType.LEFT,
                                            indent: {
                                                firstLine: 300,
                                                size: 300,
                                                type: WidthType.DXA,
                                            }
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER
                                }),
                                celda_vacia,
                                celda_vacia,
                                celda_vacia,
                                celda_vacia,
                                celda_vacia,
                                celda_vacia
                            ]
                        }),
                        new TableRow({
                            height: {
                                value: 500, 
                                rule: HeightRule.EXACT
                            },
                            children : [
                                new TableCell({
                                    borders: sin_bordes,
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "Telefono",
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    borders: linea,
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: planilla_propuesta_TEG.empresa.telefono,
                                                })
                                            ],
                                            style: "aside",
                                            alignment: AlignmentType.LEFT,
                                            indent: {
                                                firstLine: 300,
                                                size: 300,
                                                type: WidthType.DXA,
                                            }
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER
                                }),
                                celda_vacia,
                                celda_vacia,
                                celda_vacia,
                                celda_vacia,
                                celda_vacia,
                                celda_vacia
                            ]
                        }),
                    ]
                }),
                new Paragraph({
                    children: [
                    ],
                    spacing: {
                        before: 100,
                        after: 100
                    }
                }),
                new Paragraph({
                    style: "aside",
                    children:[ 
                        new TextRun({
                            text: "Historial de revisiones",
                            bold: true
                        })
                    ],
                    alignment: AlignmentType.CENTER
                }),
                new Paragraph({
                    children: [
                    ],
                    spacing: {
                        before: 100,
                        after: 100
                    }
                }),
                new Table({
                    rows: [
                        generarNombresAlumno(planilla_propuesta_TEG.alumnos[0]),
                        //generarNombresAlumno(planilla_propuesta_TEG),
                        new TableRow({
                            height: {
                                value: 500, 
                                rule: HeightRule.EXACT
                            },
                            children : [
                                new TableCell({
                                    borders: sin_bordes,
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "Titulo del trabajo experimental de grado",
                                                    bold: true
                                                })
                                            ],
                                            alignment: AlignmentType.LEFT
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    borders: sin_bordes,
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: planilla_propuesta_TEG.titulo,
                                                })
                                            ],
                                            style: "aside",
                                            alignment: AlignmentType.LEFT
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER
                                })
                            ]
                        }),
                        new TableRow({
                            height: {
                                value: 500, 
                                rule: HeightRule.EXACT
                            },
                            children : [
                                new TableCell({
                                    borders: sin_bordes,
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "Organización donde se organizará el TEG",
                                                    bold: true
                                                })
                                            ],
                                            alignment: AlignmentType.LEFT
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    borders: sin_bordes,
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: planilla_propuesta_TEG.organizacion,
                                                })
                                            ],
                                            style: "aside",
                                            alignment: AlignmentType.LEFT
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                    borders: sin_bordes,
                                })
                            ]
                        })
                    ]
                }),
                new Paragraph({
                    children: [
                    ],
                    spacing: {
                        before: 200,
                        after: 200
                    }
                }),
                new Table({
                    columnWidths: [3000, 4500],
                    indent: {
                        size: 50,
                        type: WidthType.DXA
                    },
                    rows: [
                        new TableRow({
                            height: {
                                value: 500, 
                                rule: HeightRule.EXACT
                            },
                            children : [
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "Fecha                ",
                                                    bold: true
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                    width: {
                                        size: 1200,
                                        type: WidthType.DXA
                                    }
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "Razón de la observación",
                                                    bold: true
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        }),
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "Modificación realizada",
                                                    bold: true
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        }),
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                            ]
                        }),
                        new TableRow({
                            height: {
                                value: 500, 
                                rule: HeightRule.EXACT
                            },
                            children : [
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ],
                                        })
                                    ],
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ],
                                        })
                                    ],
                                }),
                            ]
                        }),
                        new TableRow({
                            height: {
                                value: 500, 
                                rule: HeightRule.EXACT
                            },
                            children : [
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ],
                                        })
                                    ],
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ],
                                        })
                                    ],
                                }),
                            ]
                        }),
                        new TableRow({
                            height: {
                                value: 500, 
                                rule: HeightRule.EXACT
                            },
                            children : [
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ],
                                        })
                                    ],
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ],
                                        })
                                    ],
                                }),
                            ]
                        }),
                        new TableRow({
                            height: {
                                value: 500, 
                                rule: HeightRule.EXACT
                            },
                            children : [
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER,
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ],
                                        })
                                    ],
                                    width: {
                                        size: 4000,
                                        type: WidthType.DXA
                                    }
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            style: "aside",
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ],
                                        })
                                    ],
                                    width: {
                                        size: 4000,
                                        type: WidthType.DXA
                                    }
                                }),
                            ]
                        }),
                    ]
                }),
    
            ]
        }]
    });
    /*
    Packer.toBuffer(doc).then((buffer) => {
        writeFileSync("Planilla Propuesta TEG.docx", buffer);
    });
    */
   let nombre_archivo = '' 
   if(planilla_propuesta_TEG.alumnos[0].nombre !== undefined){
         nombre_archivo = planilla_propuesta_TEG.alumnos[0].nombre;
   }
   
    Packer.toBlob(doc).then(blob => {
        saveAs(blob, nombre_archivo+" Planilla propuesta TEG.docx");
        //console.log("Documento creado de forma exitosa en el navegador");
    });
}


