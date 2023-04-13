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
const { HorizontalPositionAlign,VerticalPositionAlign } = docx;
const { TextDirection } = docx;
const arrayPrueba = [
    {nombres: "Luis Carlos"},
]
const spacing = {
    after: 200,
    line: 255,
    lineRule: LineRuleType.AUTO,
};
const celdaMedia = new TableCell({
    borders: {
        right: {
            style: BorderStyle.NONE,
            size: 1,
            color: "ff0000",
        },
        left: {
            style: BorderStyle.NONE,
            size: 1,
            color: "ff0000",
        },
    },
    children: [
        new Paragraph({
            children: [
                new TextRun({
                    text: "",
                })
            ]
        })
    ]
});

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
const linea_superior = {
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
const celdaVacia = new TableCell({
                                children: [
                                    new Paragraph({
                                        children: [
                                            new TextRun({
                                                text: ""
                                            })
                                        ]
                                    })
                                ],
                                verticalAlign: VerticalAlign.CENTER
                            });
                
const celdaCuadrito = new TableCell({
                                children: [
                                    new Table({
                                        indent: {
                                            size: 75,
                                            type: WidthType.DXA,
                                        },
                                        //columnWidths: [300,300],
                                        rows: [
                                            new TableRow({
                                                children: [
                                                    new TableCell({
                                                        width: {
                                                            size: 180,
                                                            type: WidthType.DXA,
                                                        },
                                                        children: [
                                                            new Paragraph({
                                                                children: [
                                                                    new TextRun({
                                                                        text: ""
                                                                    })
                                                                ]
                                                            })
                                                        ],
                                                        verticalAlign: VerticalAlign.CENTER
                                                    })
                                                ],
                                                height: {
                                                    value: 150,
                                                    rule: HeightRule.EXACT
                                                }
                                            })
                                        ]
                                    })
                                ],
                                verticalAlign: VerticalAlign.CENTER
                            })

const cuadroCombinado = new TableCell({
                            rowSpan: 2,
                            children: [
                                new Table({
                                    indent: {
                                        size: 25,
                                        type: WidthType.DXA,
                                    },
                                    //columnWidths: [300,300],
                                    rows: [
                                        new TableRow({
                                            children: [
                                                new TableCell({
                                                    width: {
                                                        size: 150,
                                                        type: WidthType.DXA,
                                                    },
                                                    children: [
                                                        new Paragraph({
                                                            children: [
                                                                new TextRun({
                                                                    text: ""
                                                                })
                                                            ]
                                                        })
                                                    ],
                                                    verticalAlign: VerticalAlign.CENTER
                                                })
                                            ],
                                            height: {
                                                value: 150,
                                                rule: HeightRule.EXACT
                                            }
                                        })
                                    ]
                                })
                            ],
                            verticalAlign: VerticalAlign.CENTER
                        })

const generarFilaAlumno = (alumno) => {
    let fila = null;
    if( alumno != undefined && alumno != null){
            fila = new TableRow({
            children: [
                new TableCell({
                    width: {
                        size: 2000,
                        type: WidthType.DXA
                    },
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: "Alumno: ",
                                    bold: true
                                })
                            ],
                            indent: {
                                firstLine: 150
                            },
                        })
                    ]
                }),
                new TableCell({
                    width: {
                        size: 8000,
                        type: WidthType.DXA
                    },
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: alumno.apellidos + ', ' +alumno.nombres,
                                    bold: true
                                })
                            ],
                            indent: {
                                firstLine: 400
                            },
                        })
                    ]
                }),
            ],
            //Height
            height: {
                value: 400,
                rule: HeightRule.AUTO
            }
        });
        return fila;
    }
    fila = new TableRow({
        children: [
            new TableCell({
                borders: sin_bordes,
                width: {
                    size: 2000,
                    type: WidthType.DXA
                },
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "",
                                bold: true
                            })
                        ],
                        indent: {
                            firstLine: 150
                        },
                    })
                ]
            }),
            new TableCell({
                borders: sin_bordes,
                width: {
                    size: 8000,
                    type: WidthType.DXA
                },
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "",
                                bold: true
                            })
                        ],
                        indent: {
                            firstLine: 400
                        },
                    })
                ]
            }),
        ],
        //Height
        height: {
            value: 400,
            rule: HeightRule.AUTO
        }
    });

    return fila
}

const generarFilaNombreAlumno = (alumno) => {
    let tabla = null;
    if( alumno != undefined && alumno != null){
        tabla = new Table({
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 5000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: "Nombre del alumno: "
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 4000,
                                            type: WidthType.DXA
                                        },
                                        children: [
                                            new Paragraph({
                                                children: [
                                                    new TextRun({
                                                        text: alumno.apellidos + ', ' +alumno.nombres
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                ]
                            })
                        ]
                    })
                    return tabla;
    }

    tabla = new Table({
                rows: [
                    new TableRow({
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
                        ]
                    })
                ]
            })

    return tabla;
}

const generarCriteriosAlumno = (alumno) => {
    let tabla = null;
    if( alumno != undefined && alumno != null){
        tabla = new Table({
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    width: {
                                        size: 5000,
                                        type: WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Criterios de evaluación"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "0"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "1"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "2"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "3"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "4"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "5"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "6"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "7"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "8"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "9"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "10"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "11"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "12"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    width: {
                                        size: 5000,
                                        type: WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Calidad de la exposición: Dominio del tema"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    width: {
                                        size: 5000,
                                        type: WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Desenvolvimiento del alumno (uso de los recursos, tono de voz, seguridad, manejo del espacio físico…)"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    width: {
                                        size: 5000,
                                        type: WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Respuestas emitidas"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                            ]
                        }),
                    ]
                });
                return tabla
    }
}

const generarC2Alumno = (alumno) => {
    if( alumno != undefined && alumno != null){
        const parrafo = new Paragraph({
            children: [
                new TextRun({
                    text: "C2)   Evaluación de la Presentación y Defensa Individual "
                })
            ],
            spacing: {
                after: 100,
                before: 100
            }
        });
        return parrafo;
    }
}
const generarFilaFinalAlumno = (alumno) => {
    let fila = null;
    if( alumno != undefined && alumno != null){
        fila = new TableRow({
            children: [
                new TableCell({
                    width: {
                        size: 4000,
                        type: WidthType.DXA
                    },
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: "Alumno: " + alumno.apellidos +', ' +alumno.nombres
                                })
                            ],
                            alignment: AlignmentType.CENTER
                        })
                    ],
                    verticalAlign: VerticalAlign.CENTER
                }),
                new TableCell({
                    width: {
                        size: 1000,
                        type: WidthType.DXA
                    },
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: ""
                                })
                            ],
                            alignment: AlignmentType.CENTER
                        })
                    ],
                    verticalAlign: VerticalAlign.CENTER
                }),
                new TableCell({
                    width: {
                        size: 1000,
                        type: WidthType.DXA
                    },
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: ""
                                })
                            ],
                            alignment: AlignmentType.CENTER
                        })
                    ],
                    verticalAlign: VerticalAlign.CENTER
                }),
                new TableCell({
                    width: {
                        size: 1000,
                        type: WidthType.DXA
                    },
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: ""
                                })
                            ],
                            alignment: AlignmentType.CENTER
                        })
                    ],
                    verticalAlign: VerticalAlign.CENTER
                }),
                new TableCell({
                    width: {
                        size: 1000,
                        type: WidthType.DXA
                    },
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: ""
                                })
                            ],
                            alignment: AlignmentType.CENTER
                        })
                    ],
                    verticalAlign: VerticalAlign.CENTER
                }),
                new TableCell({
                    width: {
                        size: 1000,
                        type: WidthType.DXA
                    },
                    children: [
                        new Paragraph({
                            children: [
                                new TextRun({
                                    text: ""
                                })
                            ],
                            alignment: AlignmentType.CENTER
                        })
                    ],
                    verticalAlign: VerticalAlign.CENTER
                }),
            ]
        })
        return fila;
    }
    console.log("fila")
    fila = new TableRow({
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
            })
        ]
    })
    return fila;
}
const generarPonderacionAlumno = (alumno, index) => {
    let tabla = null;
    if( alumno != undefined && alumno != null){
        tabla = new Table({
            rows: [
                new TableRow({
                    children: [
                        new TableCell({
                            width: {
                                size: 5000,
                                type: WidthType.DXA
                            },
                            children: [
                                new Paragraph({
                                    children: [
                                        new TextRun({
                                            text: "Total D" + index +" (máximo 20 puntos) "
                                        })
                                    ]
                                })
                            ]
                        }),
                        new TableCell({
                            width: {
                                size: 4000,
                                type: WidthType.DXA
                            },
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
                    ]
                })
            ]
        })
        return tabla;
    }
}
export const planilla_evaluacion_TIG_TA = (notificacion) => {
    console.log(notificacion)
    const doc = new  Document({
        creator: "Luis C. Somoza & Wladimir San Vicente",
        title: "Planilla de Evaluación Trabajo Instrumental de Grado (TIG) - Tutor Académico",
        description: "Planilla de Evaluación Trabajo Instrumental de Grado (TIG) - Tutor Académico",
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
                    id: "titulo",
                    name: "Aside",
                    basedOn: "Normal",
                    next: "Normal",
                    run: {
                        size: 24,
                    },
                    paragraph: {
                        spacing: {
                            line: 276,
                        },
                    },
                },
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
                            line: 276,
                        },
                    },
                },
                {
                    id: "reducido",
                    name: "Reducido",
                    basedOn: "Normal",
                    next: "Normal",
                    run: {
                        size: 15,
                    },
                    paragraph: {
                        spacing: {
                            line: 276,
                        },
                    },
                },
                {
                    id: "ultrareducido",
                    name: "Reducido",
                    basedOn: "Normal",
                    next: "Normal",
                    run: {
                        size: 10,
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
                    style: "titulo",
                    children: [
                        new TextRun({
                            text: "Planilla de Evaluación Trabajo Instrumental de Grado (TIG) - Tutor Académico",
                            bold: true
                        })
                    ],
                    spacing: {
                        after: 200
                    },
                    alignment: AlignmentType.CENTER
                }),
                new Table({
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    width: {
                                        size: 2000,
                                        type: WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Título TIG",
                                                    bold: true
                                                })
                                            ],
                                            indent: {
                                                firstLine: 150
                                            },
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 8000,
                                        type: WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: notificacion.tg.titulo,
                                                    bold: true
                                                })
                                            ],
                                            indent: {
                                                firstLine: 400
                                            },
                                        })
                                    ]
                                }),
                            ],
                            //Height
                            height: {
                                value: 400,
                                rule: HeightRule.AUTO
                            }
                        }),
                        generarFilaAlumno(notificacion.alumnos[0]),
                        generarFilaAlumno(notificacion.alumnos[1])
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "A)        Evaluación Continua: "
                        })
                    ],
                    spacing: {
                        after: 100,
                        before: 100
                    }
                }),
                new Table({
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    width: {
                                        size: 3000,
                                        type:  WidthType.DXA
                                    },
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
                                    width: {
                                        size: 3000,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Criterios de evaluación"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "0"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "1"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "2"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "3"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "4"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "5"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "6"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "7"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "8"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "9"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "10"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Tutor Empresarial"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
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
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
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
                                    children: [
                                        new Paragraph({
                                            style: "ultrareducido",
                                            children: [
                                                new TextRun({
                                                    text: "0"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            style: "ultrareducido",
                                            children: [
                                                new TextRun({
                                                    text: "1-4"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            style: "ultrareducido",
                                            children: [
                                                new TextRun({
                                                    text: "5-8"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            style: "ultrareducido",
                                            children: [
                                                new TextRun({
                                                    text: "9-12"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            style: "ultrareducido",
                                            children: [
                                                new TextRun({
                                                    text: "13-16"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            style: "ultrareducido",
                                            children: [
                                                new TextRun({
                                                    text: "17-20"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Máximo 5 puntos "
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
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
                            ]
                        }),
                        /////////////////////////////////////////////////////////
                        new TableRow({
                            children: [
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Tutor Académico"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Responsabilidad e informes semanales"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
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
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Documento de Visión"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Máximo 5 puntos "
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
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
                            ]
                        }),
                        //////////////////////////////////////////////////////////////
                        new TableRow({
                            children: [
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Total A (Máximo 10 puntos)"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
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
                            ]
                        }),
                    ]
                }),

                new Paragraph({
                    children: [
                        new TextRun({
                            text: ""
                        })
                    ],
                    spacing: {
                        after: 100,
                        before: 100
                    }
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "B)    Evaluación del Documento Escrito:"
                        })
                    ],
                    spacing: spacing
                }),
                new Table({
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    width: {
                                        size: 3000,
                                        type:  WidthType.DXA
                                    },
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
                                    width: {
                                        size: 3000,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Criterios de evaluación"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "0"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "1"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "2"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "3"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "4"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "5"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "6"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "7"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "8"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "9"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "10"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                            ]
                        }),
                        ////////////////////////////////////////////////////
                        new TableRow({
                            children: [
                                new TableCell({
                                    borders: {
                                        bottom: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Presentación, redacción",
                                                    bold: true
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    borders: {
                                        bottom: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Precisión, claridad, brevedad",
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                cuadroCombinado,
                                cuadroCombinado,
                                cuadroCombinado,
                            ],
                            verticalAlign: VerticalAlign.CENTER
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    borders: {
                                        bottom: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "ortografía",
                                                    bold: true
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    rowSpan: 2,
                                    borders: {
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    borders: {
                                        right: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Máximo 4 puntos",
                                                    bold: true
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    borders: {
                                        right: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    borders: {
                                        right: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                new TableCell({
                                    borders: {
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                            ]
                        }),
                        ////////////////////////////////////////////////////
                        ////////////////////////////////////////////////////
                        new TableRow({
                            children: [
                                new TableCell({
                                    borders: {
                                        bottom: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Metodología Aplicada",
                                                    bold: true
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    borders: {
                                        bottom: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Selección",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    borders: {
                                        bottom: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                    bold: true
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    borders: {
                                        bottom: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Justificación",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    borders: {
                                        right: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Máximo 4 puntos",
                                                    bold: true
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    borders: {
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    borders: {
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
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                new TableCell({
                                    borders: {
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                            ]
                        }),
                        ////////////////////////////////////////////////////
                        new TableRow({
                            children: [
                                new TableCell({
                                    borders: {
                                        bottom: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Desarrollo ",
                                                    bold: true
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    borders: {
                                        bottom: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Uso de la Metodología",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    borders: {
                                        bottom: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                    bold: true
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    borders: {
                                        bottom: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Documentación técnica",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    borders: {
                                        right: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Máximo 4 puntos",
                                                    bold: true
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    borders: {
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    borders: {
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
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                new TableCell({
                                    borders: {
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                            ]
                        }),
                        ////////////////////////////////////////////////////
                        new TableRow({
                            children: [
                                new TableCell({
                                    borders: {
                                        bottom: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Resultados ",
                                                    bold: true
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    borders: {
                                        bottom: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Precisión en los productos obtenidos",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    borders: {
                                        bottom: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                    bold: true
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    borders: {
                                        bottom: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Cumplimiento de los objetivos",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    borders: {
                                        right: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Máximo 8 puntos",
                                                    bold: true
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    borders: {
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    borders: {
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
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                new TableCell({
                                    borders: {
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                            ]
                        }),
                        ////////////////////////////////////////////////////
                        new TableRow({
                            children: [
                                new TableCell({
                                    borders: {
                                        bottom: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Conclusiones ",
                                                    bold: true
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    borders: {
                                        bottom: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Profundidad",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    borders: {
                                        bottom: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                    bold: true
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    borders: {
                                        bottom: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Validez",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    borders: {
                                        right: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Máximo 8 puntos",
                                                    bold: true
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    borders: {
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    borders: {
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
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                new TableCell({
                                    borders: {
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                            ]
                        }),
                        ////////////////////////////////////////////////////
                        new TableRow({
                            children: [
                                new TableCell({
                                    borders: {
                                        bottom: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Recomendaciones",
                                                    bold: true
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    borders: {
                                        top: {
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
                                            children: [
                                                new TextRun({
                                                    text: "Máximo 4 puntos",
                                                    bold: true
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    borders: {
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    borders: {
                                        right: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                new TableCell({
                                    borders: {
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                            ]
                        }),
                        ////////////////////////////////////////////////////
                        new TableRow({
                            children: [
                                new TableCell({
                                    borders: {
                                        bottom: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Bibliografía",
                                                    bold: true
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    borders: {
                                        top: {
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
                                            children: [
                                                new TextRun({
                                                    text: "Máximo 2 puntos",
                                                    bold: true
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    borders: {
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    borders: {
                                        right: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                new TableCell({
                                    borders: {
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                            ]
                        }),
                    ]
                }),

                new Paragraph({
                    children: [
                        new TextRun({
                            text: ""
                        })
                    ],
                    spacing: {
                        after: 100,
                        before: 100
                    }
                }),
                new Table({
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    width: {
                                        size: 3000,
                                        type:  WidthType.DXA
                                    },
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
                                    width: {
                                        size: 3000,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Criterios de evaluación"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "0"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "1"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "2"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "3"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "4"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "5"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "6"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "7"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "8"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "9"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "10"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                            ]
                        }),
                        ///////////////////////////////////////////////////////
                        new TableRow({
                            children: [
                                new TableCell({
                                    rowSpan: 2,
                                    borders: {
                                        bottom: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Aporte como Ingeniero ",
                                                    bold: true
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    rowSpan: 2,
                                    borders: {
                                        bottom: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            style: "reducido",
                                            children: [
                                                new TextRun({
                                                    text: "Recomendación de la plataforma tecnológica (hardware, software, comunicación) justificada con base en los requerimientos técnicos de la organización",
                                                })
                                            ],
                                        })
                                    ]
                                }),
                                cuadroCombinado,
                                cuadroCombinado,
                                cuadroCombinado,
                                cuadroCombinado,
                                cuadroCombinado,
                                cuadroCombinado,
                                cuadroCombinado,
                                cuadroCombinado,
                                cuadroCombinado,
                                cuadroCombinado,
                                cuadroCombinado,
                            ],
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    borders: {
                                        bottom: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                    bold: true
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    borders: {
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            style: "reducido",
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                            ]
                        }),
                        ///////////////////////////////////////////////////////
                        new TableRow({
                            children: [
                                new TableCell({
                                    rowSpan: 2,
                                    borders: {
                                        bottom: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: " ",
                                                    bold: true
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    rowSpan: 2,
                                    borders: {
                                        bottom: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            style: "reducido",
                                            children: [
                                                new TextRun({
                                                    text: "Definición o rediseño de el o los procesos involucrados, identificando los aspectos de mejora o innovación y justificando los mismos con base en los requerimientos funcionales de la organización",
                                                })
                                            ],
                                        })
                                    ]
                                }),
                                cuadroCombinado,
                                cuadroCombinado,
                                cuadroCombinado,
                                cuadroCombinado,
                                cuadroCombinado,
                                cuadroCombinado,
                                cuadroCombinado,
                                cuadroCombinado,
                                cuadroCombinado,
                                cuadroCombinado,
                                cuadroCombinado,
                            ],
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    borders: {
                                        bottom: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                    bold: true
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    borders: {
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            style: "reducido",
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                            ]
                        }),
                        ///////////////////////////////////////////////////////
                        new TableRow({
                            children: [
                                new TableCell({
                                    borders: {
                                        right: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        top: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Máximo 20 puntos",
                                                    bold: true
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    borders: {
                                        right: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    borders: {
                                        right: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                celdaMedia,
                                new TableCell({
                                    borders: {
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "",
                                                })
                                            ]
                                        })
                                    ]
                                }),
                            ]
                        }),
                        ////////////////////////////////////////////////////////
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: ""
                        })
                    ],
                    spacing: {
                        after: 100,
                        before: 100
                    }
                }),
                new Table({
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    width: {
                                        size: 6000,
                                        type: WidthType.DXA,
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "TOTAL B (Máximo 50 puntos)"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 3000,
                                        type: WidthType.DXA,
                                    },
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
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: ""
                        })
                    ],
                    spacing: {
                        after: 100,
                        before: 100
                    }
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: ""
                        }),
                        new PageBreak()
                    ],
                    spacing: {
                        after: 100,
                        before: 100
                    }
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "C)     Evaluación de la Presentación y Defensa Común"
                        })
                    ],
                    spacing: {
                        after: 100,
                        before: 100
                    }
                }),
                new Table({
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    width: {
                                        size: 5000,
                                        type: WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Criterios de evaluación"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "0"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "1"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "2"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "3"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "4"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "5"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "6"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "7"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "8"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "9"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "10"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "11"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 300,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "12"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ]
                                }),
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    width: {
                                        size: 5000,
                                        type: WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Tiempo de la presentación (30 minutos)"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    width: {
                                        size: 5000,
                                        type: WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Contenido y organización de la presentación"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                            ]
                        }),
                        new TableRow({
                            children: [
                                new TableCell({
                                    width: {
                                        size: 5000,
                                        type: WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Demostración del producto obtenido"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                                celdaCuadrito,
                            ]
                        }),
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: ""
                        })
                    ],
                    spacing: {
                        after: 100,
                        before: 100
                    }
                }),
                new Table({
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    width: {
                                        size: 5000,
                                        type:  WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Total C (máximo 20)"
                                                })
                                            ],
                                        })
                                    ]
                                }),
                                new TableCell({
                                    width: {
                                        size: 5000,
                                        type:  WidthType.DXA
                                    },
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
                            ]
                        })
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: ""
                        })
                    ],
                    spacing: {
                        after: 100,
                        before: 100
                    }
                }),
                /////////////////////////////////////////////////////////////////////////////
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "D1)    Evaluación de la Presentación y Defensa Individual "
                        })
                    ],
                    spacing: spacing
                }),
                generarFilaNombreAlumno(notificacion.alumnos[0]),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: ""
                        })
                    ],
                    spacing: {
                        after: 100,
                        before: 100
                    }
                }),
                generarCriteriosAlumno(notificacion.alumnos[0]),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: ""
                        })
                    ],
                    spacing: {
                        after: 100,
                        before: 100
                    }
                }),
                generarPonderacionAlumno(notificacion.alumnos[0],1),
                generarC2Alumno(notificacion.alumnos[1]),
                generarFilaNombreAlumno(notificacion.alumnos[1]),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: ""
                        })
                    ],
                    spacing: {
                        after: 100,
                        before: 100
                    }
                }),
                generarCriteriosAlumno(notificacion.alumnos[1]),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: ""
                        })
                    ],
                    spacing: {
                        after: 100,
                        before: 100
                    }
                }),
                generarPonderacionAlumno(notificacion.alumnos[1],2),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: ""
                        })
                    ],
                    spacing: {
                        after: 100,
                        before: 100
                    }
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: "Nota Total (base 100) "
                        })
                    ],
                    spacing: {
                        after: 100,
                        before: 100
                    }
                }),
                new Table({
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    width: {
                                        size: 4000,
                                        type: WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Sección de Evaluación"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.CENTER
                                }),
                                new TableCell({
                                    width: {
                                        size: 1000,
                                        type: WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "A/10"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.TOP
                                }),
                                new TableCell({
                                    width: {
                                        size: 1000,
                                        type: WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "B/50"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.TOP
                                }),
                                new TableCell({
                                    width: {
                                        size: 1000,
                                        type: WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "C/20"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.TOP
                                }),
                                new TableCell({
                                    width: {
                                        size: 1000,
                                        type: WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "D/20"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.TOP
                                }),
                                new TableCell({
                                    width: {
                                        size: 1000,
                                        type: WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Total"
                                                })
                                            ],
                                            alignment: AlignmentType.CENTER
                                        })
                                    ],
                                    verticalAlign: VerticalAlign.TOP
                                }),
                            ]
                        }),
                        generarFilaFinalAlumno(notificacion.alumnos[0]),
                        generarFilaFinalAlumno(notificacion.alumnos[1])
                    ]
                }),
                new Paragraph({
                    children: [
                        new TextRun({
                            text: " "
                        })
                    ],
                    spacing: {
                        after: 100,
                        before: 100
                    }
                }),
                new Table({
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    borders: {
                                        right: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        }
                                    },
                                    width: {
                                        size: 1000,
                                        type: WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Fecha"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    borders: {
                                        right: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",  
                                        }
                                    },
                                    width: {
                                        size: 4000,
                                        type: WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: new Date().toLocaleDateString()
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    borders: {
                                        right: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",
                                        },
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",  
                                        }
                                    },
                                    width: {
                                        size: 1000,
                                        type: WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Tutor Académico"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                new TableCell({
                                    borders: {
                                        left: {
                                            style: BorderStyle.NONE,
                                            size: 1,
                                            color: "ff0000",  
                                        }
                                    },
                                    width: {
                                        size: 4000,
                                        type: WidthType.DXA
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "[Inserte nombre del jurado aquí]"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                            ]
                        })
                    ]
                })
            ]
        }]
    });
    const nombre_archivo = "Evaluación TIG JuradoTutor MadridJuan Alumnos DuranCarla MuñozFlorentino"
    let archivo = null;
    Packer.toBlob(doc).then( blob => {
         saveAs(blob, nombre_archivo+".docx");
        //console.log("Documento creado de forma exitosa en el navegador");
    });
}

