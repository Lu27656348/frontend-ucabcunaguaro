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
    line: 355,
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
const generarFilaDatosAlumno = (alumno,titulo,tutor,jurado1,jurado2) => {
    console.log("generarFilaDatosAlumno()");
    if( alumno != undefined && alumno != null && tutor !== undefined){
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
                new TableCell({
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
                }),
                new TableCell({
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
                }),
                new TableCell({
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
                }),
                new TableCell({
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
                }),
            ]
        });
        return filaAlumno
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
export const notificacion_designacion_j = (notificacion) => {

    console.log("notificacion_designacion_j")
    console.log(notificacion)
    const doc = new  Document({
        creator: "Luis C. Somoza & Wladimir San Vicente",
        title: "Carta de notificacion de Jurado - Dirigida a profesor jurado",
        description: "Carta de designación - Tutor de propuesta de trabajo de grado experimental",
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
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Profesor: " + notificacion.tutor_academico.apellidos + ', ' + notificacion.tutor_academico.nombres
                        })
                    ],
                    spacing: spacing,
                    style: "aside",
                    alignment: AlignmentType.JUSTIFIED
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: `Me es grato dirigirme a Usted en oportunidad de informarle que en Consejo de Escuela N° ${notificacion.cde.id_cde_formateado} de ${notificacion.cde.fecha_conformacion}, ha sido designado como jurado del siguiente Trabajo de Grado:`
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
                            text: "Para la revisión y evaluación de este Trabajo de Grado se anexan los siguientes documentos:"
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
                            text: "Informe del Trabajo de Grado"
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
                            text: "Guía para el Jurador Examinador, el cual contiene un extracto del Reglamento de Trabajos de Grado de la Facultad de Ingeniería relativo a evaluación y criterios a ser evaluados."
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
                            text: "Planillas de evaluación del trabajo de grado editable, prellenadas con los datos del TG y del(los) estudiante(s)"
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
                            text: "Planilla de evaluación del final editable, prellenada con los datos de la propuesta y del(los) estudiante(s) (solo a utilizar por el presidente del jurado)"
                        })
                    ],
                    spacing: spacing,
                    style: "aside"
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Las Planillas de evaluación estarán impresas y disponibles para ser retiradas en La Escuela de Ingeniería Informática, cuando usted guste. "
                        })
                    ],
                    spacing: spacing,
                    style: "aside"
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "La presentación oral será fijada para la segunda semana del mes de noviembre 2022, de acuerdo a la disponibilidad de los participantes. Posteriormente se le informará el lugar, fecha y hora de la misma."
                        })
                    ],
                    spacing: spacing,
                    style: "aside"
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "De antemano la Escuela de Ingeniería Informática desea expresarle un especial agradecimiento por su colaboración en la evaluación de este Trabajo de Grado."
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
    const nombre_archivo = "Notificacion de designacion de jurado"
    let archivo = null;
    Packer.toBlob(doc).then( blob => {
         saveAs(blob, nombre_archivo+".docx");
        //console.log("Documento creado de forma exitosa en el navegador");
    });
}

