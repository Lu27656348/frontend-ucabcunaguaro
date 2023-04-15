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
const arrayPrueba = [
    {nombres: "Luis Carlos"},
]
const spacing = {
    after: 200,
    line: 255,
    lineRule: LineRuleType.AUTO,
};
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
let flag = 1;
let alumnoCounter= 1;
const generarFilaDatosAlumno = (alumno,titulo,tutor,jurado1,jurado2) => {
    console.log("generarFilaDatosAlumno()");
    if( alumno != undefined && alumno != null && tutor !== undefined){
        let celdaTutor1 = null;
        let celdaTitulo = null;
        let celdaJurado1 = null;
        let celdaJurado2 = null;
        if(alumnoCounter == 1){
            celdaTitulo = new TableCell({
                                rowSpan: 2,
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: titulo
                                            })
                                        ],
                                        style: "aside"
                                    })
                                ]
                            });
            celdaTutor1 = new TableCell({
                                rowSpan: 2,
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: tutor.apellidos + ', ' + tutor.nombres
                                            })
                                        ],
                                        style: "aside"
                                    })
                                ]
                            });
            celdaJurado1 = new TableCell({
                                rowSpan: 2,
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: jurado1.apellidos + ', ' + jurado1.nombres
                                            })
                                        ],
                                        style: "aside"
                                    })
                                ]
                            });
            celdaJurado2 = new TableCell({
                                rowSpan: 2,
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: jurado2.apellidos + ', ' + jurado2.nombres
                                            })
                                        ],
                                        style: "aside"
                                    })
                                ]
                            })
        }else{
            celdaTitulo = new TableCell({
                                borders: sin_bordes,
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: ""
                                            })
                                        ],
                                        style: "aside"
                                    })
                                ]
                            });
            celdaTutor1 = new TableCell({
                                borders: sin_bordes,
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: ""
                                            })
                                        ],
                                        style: "aside"
                                    })
                                ]
                            });
            celdaJurado1 = new TableCell({
                                borders: sin_bordes,
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: ""
                                            })
                                        ],
                                        style: "aside"
                                    })
                                ]
                            });
            celdaJurado2 = new TableCell({
                                borders: sin_bordes,
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: ""
                                            })
                                        ],
                                        style: "aside"
                                    })
                                ]
                            });
        } 
        
        if(alumnoCounter <= 2){
            console.log(alumno);
            console.log(tutor);
            let filaAlumno = new TableRow({
                children: [
                    new TableCell({
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: alumno.apellidos + ', ' + alumno.nombres
                                    })
                                ],
                                style: "aside"
                            })
                        ]
                    }),
                    new TableCell({
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: alumno.cedula
                                    })
                                ],
                                style: "aside"
                            })
                        ]
                    }),
                    celdaTitulo,
                    celdaTutor1,
                    celdaJurado1,
                    celdaJurado2,
                ]
            });
            alumnoCounter = alumnoCounter + 1;
            return filaAlumno
        }
    }
    let filaAlumno = new TableRow({
                                children: [
                                        new TableCell({
                                            borders: sin_bordes,
                                            children: [
                                                new Paragraph({
                                                    children: [
                                                        new TextRun({
                                                            text: ""
                                                        })
                                                    ],
                                                    style: "aside"
                                                })
                                            ]
                                        })
                                ]
                            })
    return filaAlumno;
}
const generarTablaDatosAlumno = (notificacion) => {
    console.log("generarTablaDatosAlumno()");
    const tabla = new Table({
        width: {
            size: 10000,
            type: WidthType.DXA,
        },
        rows: [
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 1000,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "Estudiante"
                                    })
                                ],
                                style: "aside",
                                alignment: AlignmentType.CENTER
                            })
                        ],
                        verticalAlign: VerticalAlign.CENTER
                    }),
                    new TableCell({
                        width: {
                            size: 1000,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "Cedula"
                                    })
                                ],
                                style: "aside",
                                alignment: AlignmentType.CENTER
                            })
                        ],
                        verticalAlign: VerticalAlign.CENTER
                    }),
                    new TableCell({
                        width: {
                            size: 1000,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "Titulo trabajo de grado"
                                    })
                                ],
                                alignment: AlignmentType.CENTER,
                                style: "aside"
                            })
                        ],
                        verticalAlign: VerticalAlign.CENTER
                    }),
                    new TableCell({
                        width: {
                            size: 1000,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "Tutor"
                                    })
                                ],
                                alignment: AlignmentType.CENTER,
                                style: "aside"
                            })
                        ],
                        verticalAlign: VerticalAlign.CENTER
                    }),
                    new TableCell({
                        width: {
                            size: 1000,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "Jurado 1 "
                                    })
                                ],
                                alignment: AlignmentType.CENTER,
                                style: "aside"
                            })
                        ],
                        verticalAlign: VerticalAlign.CENTER
                    }),
                    new TableCell({
                        width: {
                            size: 1000,
                            type: WidthType.DXA,
                        },
                        children: [
                            new Paragraph({
                                children: [
                                    new TextRun({
                                        text: "Jurado 2"
                                    })
                                ],
                                style: "aside",
                                alignment: AlignmentType.CENTER,
                            })
                        ],
                        verticalAlign: VerticalAlign.CENTER
                    }),
                ]
            }),
            generarFilaDatosAlumno(notificacion.alumnos[0],notificacion.tg.titulo,notificacion.tutor_academico,notificacion.jurado1,notificacion.jurado2),
            generarFilaDatosAlumno(notificacion.alumnos[1],notificacion.tg.titulo,notificacion.tutor_academico,notificacion.jurado1,notificacion.jurado2),
        ]
    })
    return tabla
}
const generarInformacionAlumno = (alumno)  => {
    if( alumno != undefined && alumno != null){
        const fila = new Paragraph({
            children: [
                new TextRun({
                    text: "Estudiante: " + alumno.apellidos + ', ' + alumno.nombres
                })
            ]
        })
        return fila;
    }
    const fila = new Paragraph({
        children: [
            new TextRun({
                text: ""
            })
        ]
    });
    return fila
}
export const notificacion_designacion = (notificacion) => {

    console.log("notificacion_designacion")
    console.log(notificacion)
    const doc = new  Document({
        creator: "Luis C. Somoza & Wladimir San Vicente",
        title: "Carta de notificacion de Jurado - Dirigida a estudiantes",
        description: "Carta de notificacion de Jurado - Dirigida a estudiantes",
        styles: {
            default: {
                heading1: {
                    run: {
                        size: 30,
                        bold: true,
                        italics: true,
                        color: "FF0000",
                    },
                    paragraph: {
                        spacing: {
                            after: 200,
                        },
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
                        size: 20,
                    },
                    paragraph: {
                        spacing: {
                            line: 276,
                        },
                    },
                },
                {
                    id: "despedida",
                    name: "Despedida",
                    basedOn: "Normal",
                    next: "Normal",
                    run: {
                        size: 26,
                    },
                    paragraph: {
                        spacing: {
                            line: 276,
                        },
                    },
                }
            ]
        },
        sections: [{
            properties: {
                type:  SectionType.CONTINUOUS,
                margin: {
                    top: 150,
                    right: 150,
                    bottom: 150,
                    left: 150,
                }
            },
            headers: {
                default: new  Header({
                    children: [new  Paragraph({
                        children: [
                            /*
                            new  ImageRun({
                                data: fs.readFileSync('logo.png'),
                                transformation: {
                                    width: 400,
                                    height: 100,
                                },
                            }),
                            */
                        ],
                        alignment:  AlignmentType.LEFT
                    })],
                }),
            },
            footers: {
                default: new  Footer({
                    children: [
                        new  Paragraph({
                            children: [
                                /*
                                new  ImageRun({
                                    data: fs.readFileSync('Untitled.png'),
                                    transformation: {
                                        width: 600,
                                        height: 15,
                                    },
                                    alignment:  AlignmentType.CENTER
                                }),
                                */
                            ],
                            alignment:  AlignmentType.CENTER
                        }),
                        new  Paragraph({
                            children: [
                                new  TextRun({
                                    text: "UNIVERSIDAD CATÓLICA ANDRÉS BELLO – Extensión Guayana",
                                })
                            ],
                            alignment:  AlignmentType.CENTER
                        }),
                        new  Paragraph({
                            children: [
                                new  TextRun({
                                    text: "Avenida Atlántico, Ciudad Guayana 8050",
                                })
                            ],
                            alignment:  AlignmentType.CENTER
                        }),
                        new  Paragraph({
                            children: [
                                new  TextRun({
                                    text: "Bolívar, Venezuela. Teléfono: +58-286-6000111"
                                })
                            ],
                            alignment:  AlignmentType.CENTER
                        }),
                        new  Paragraph({
                            children: [
                                new  TextRun({
                                    text: "URL: http://www.guayanaweb.ucab.edu.ve/escuela-de-ingenieria-informatica.html"
                                })
                            ],
                            alignment:  AlignmentType.CENTER
                        })
                    ],
                }),
            },
            children: [
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Puerto Ordaz, " + new Date().toLocaleDateString()
                        })
                    ],
                    spacing: spacing,
                    style: "aside",
                    alignment: AlignmentType.RIGHT
                }),
                generarInformacionAlumno(notificacion.alumnos[0]),
                generarInformacionAlumno(notificacion.alumnos[1]),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `Me es grato dirigirme a Usted en oportunidad de informarle que en Consejo de Escuela N° ${notificacion.cde.id_cde_formateado} de ${notificacion.cde.fecha_conformacion}, han sido designados los siguientes jurados para la revisión y evaluación de su Trabajo de Grado:`
                        })
                    ],
                    spacing: spacing,
                    alignment: AlignmentType.JUSTIFIED,
                    style: "aside"
                }),
                generarTablaDatosAlumno(notificacion),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "El jurado ya dispone del Informe del Trabajo de Grado para su revisión, así como de las planillas relativas a la evaluación del Trabajo de Grado. "
                        })
                    ],
                    spacing: spacing,
                    style: "aside"
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "La presentación oral será fijada para la segunda semana del mes de noviembre 2022, de acuerdo a la disponibilidad de los participantes. Posteriormente se le informará el lugar, fecha y hora de la misma"
                        })
                    ],
                    spacing: spacing,
                    style: "aside"
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "A continuación, le indico un resumen de la dinámica de actividades y responsabilidades para la presentación oral de su trabajo de grado"
                        })
                    ],
                    spacing: spacing,
                    style: "aside"
                }),
                new Paragraph({
                    bullet: {
                        level: 0
                    },
                    children: [
                        new TextRun({
                            text: "Debe tener listo el material de apoyo de la presentación de su Trabajo de Grado, debidamente revisada por su tutor académico."
                        })
                    ],
                    spacing: spacing,
                    style: "aside"
                }),
                new Paragraph({
                    bullet: {
                        level: 0
                    },
                    children: [
                        new TextRun({
                            text: "El Artículo 12 del Reglamento del Trabajo de Grado de la Facultad de Ingeniería (No. 9.01.08, del 19 de julio de 2018), establece que “La presentación oral del TG será un acto privado; si alguna persona ajena al Jurado Examinador desea presenciar el acto, deberá solicitar ante él su aprobación”, en caso de que el(los) tesista(s) desee tener invitados debe solicitarlo a través del correo lmedinac@ucab.edu.ve: indicando nombre completo, número de cédula y filiación o motivo de su presencia en la presentación del Trabajo de Grado."
                        })
                    ],
                    spacing: spacing,
                    style: "aside"
                }),
                new Paragraph({
                    bullet: {
                        level: 0
                    },
                    children: [
                        new TextRun({
                            text: "El día de la presentación oral:"
                        })
                    ],
                    spacing: spacing,
                    style: "aside"
                }),
                new Paragraph({
                    bullet: {
                        level: 1
                    },
                    children: [
                        new TextRun({
                            text: "Estar preparados al menos una hora antes de la hora de inicio de la Presentación."
                        })
                    ],
                    spacing: spacing,
                    style: "aside"
                }),
                new Paragraph({
                    bullet: {
                        level: 1
                    },
                    children: [
                        new TextRun({
                            text: "Verificar el correcto funcionamiento de los equipos de apoyo de la Presentación y tener un plan alternativo de apoyo, en caso de que falle el principal en el momento de la exposición."
                        })
                    ],
                    spacing: spacing,
                    style: "aside"
                }),
                new Paragraph({
                    bullet: {
                        level: 1
                    },
                    children: [
                        new TextRun({
                            text: "Se recomienda para la presentación vestir ropa formal."
                        })
                    ],
                    spacing: spacing,
                    style: "aside"
                }),
                new Paragraph({
                    bullet: {
                        level: 1
                    },
                    children: [
                        new TextRun({
                            text: "El Coordinador de Trabajos de Grado o el Presidente del Jurado, indicará verbalmente a los asistentes las normas respectivas, en cuanto a la no participación ni interrupción de la Presentación por parte de familiares y amigos, y que su presencia estará limitada a presenciar la presentación Oral, no en la sesión de preguntas ni en la parte del acto correspondiente a la deliberación, en la cual todos los presentes, incluyendo los alumnos que realizan la presentación, deben salir del recinto para que el Jurado pueda dar inicio al proceso de deliberación y evaluación del Trabajo de Grado."
                        })
                    ],
                    spacing: spacing,
                    style: "aside"
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Saludándole cordialmente"
                        })
                    ],
                    spacing: spacing,
                    style: "aside"
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Atentamente,"
                        })
                    ],
                    spacing: spacing,
                    style: "aside"
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Luz E. Medina C"
                        })
                    ],
                    spacing: spacing,
                    style: "aside"
                }),
            ]
        }]
    });
    const nombre_archivo = "Notificacion de designacion de jurado (Estudiantes)"
    let archivo = null;
    Packer.toBlob(doc).then( blob => {
         saveAs(blob, nombre_archivo+".docx");
        //console.log("Documento creado de forma exitosa en el navegador");
    });
}

