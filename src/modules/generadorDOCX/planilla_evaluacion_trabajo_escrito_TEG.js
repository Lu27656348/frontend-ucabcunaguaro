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
                                            size: 50,
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
const generarSeccion = (nombre_seccion, criterios) => {

}
export const planilla_evaluacion_trabajo_escrito_TEG = (notificacion) => {
    console.log(notificacion)
    const doc = new  Document({
        creator: "Luis C. Somoza & Wladimir San Vicente",
        title: "Planilla de evaluación de trabajo escrito (TEG) - Dirigida a profesor jurado",
        description: "Planilla de evaluación de trabajo escrito (TEG) - Dirigida a profesor jurado",
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
                            text: "Planilla Evaluación Trabajo Escrito - Trabajo Experimental de Grado (TEG)",
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
                                                    text: "Titulo TEG",
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
                            text: ""
                        })
                    ],
                    spacing: {
                        after: 100,
                        before: 100
                    }
                }),
                new Table({
                    indent: {
                        size: 0,
                        type: WidthType.DXA,
                    },
                    rows: [
                        new TableRow({
                            children: [
                                new TableCell({
                                    width: {
                                        size: 2000,
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
                                        size: 4000,
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
                        ////////////////////////////////////////////////////////
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
                                                    text: "Presentación",
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
                                                    text: "Márgenes",
                                                })
                                            ]
                                        })
                                    ]
                                }),
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
                                                    text: "Encuadernado",
                                                })
                                            ]
                                        })
                                    ]
                                }),
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
                                                    text: "Máximo 2 puntos",
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
                                                    text: "Redacción",
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
                                                    text: "Presentación",
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
                                                    text: "Claridad",
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
                                                    text: "Brevedad",
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
                                                    text: "Máximo 6 puntos",
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
                        ////////////////////////////////////////////////////////
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
                                                    text: "Justificación",
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
                                                    text: "Identificación del problema",
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
                                                    text: "del problema",
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
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Objetivos",
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
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Importancia",
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
                                        },
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Limitaciones",
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


                        /**/
                        /////////////////////////////////////////////////////////////////
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
                                                    text: "Metodología",
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
                                                    text: "Selección apropiada",
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
                                        }
                                    },
                                    children: [
                                        new Paragraph({
                                            children: [
                                                new TextRun({
                                                    text: "Aplicada",
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
                                            children: [
                                                new TextRun({
                                                    text: "Uso",
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
                                                    text: "Resultados",
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
                                        }
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
                                        },
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
                                        }
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
                                            children: [
                                                new TextRun({
                                                    text: "Aplicaciones y contribución",
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
                                                    text: "Máximo 14 puntos",
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
                        ////////////////////////////////////////////////////////
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
                                                    text: "Conclusiones",
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
                                                    text: "Alcance",
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
                                        }
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
                                        },
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
                                        }
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
                                        },
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
                                                    text: "Máximo 14 puntos",
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
                        /////////////////////////////////////////////////////////////////
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
                        /////////////////////////////////////////////////////////////////
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
                    spacing: spacing
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
                                                    text: "TOTAL (Máximo 60 puntos)"
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
                    spacing: spacing
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
                                                    text: "Jurado"
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
    const nombre_archivo = "Evaluacion TEG Informe Jurado BelloFranklin Alumnos AndaraLaura VeraJuan"
    let archivo = null;
    Packer.toBlob(doc).then( blob => {
         saveAs(blob, nombre_archivo+".docx");
        //console.log("Documento creado de forma exitosa en el navegador");
    });
}

