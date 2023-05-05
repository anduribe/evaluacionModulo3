
            const presupuestoInput = document.getElementById('presupuesto-input');
            const calcularBtn = document.getElementById('calcular-btn');
            const presupuesto = document.getElementById('presupuesto');
            const gastos = document.getElementById('gastos');
            const saldo = document.getElementById('saldo');
            const nombreInput = document.getElementById('nombre-input');
            const valorInput = document.getElementById('valor-input');
            const agregarBtn = document.getElementById('agregar-btn');
            const gastosLista = document.getElementById('gastos-lista');

            let presupuestoTotal = 0;
            let gastosTotal = 0;
            let saldoTotal = 0;
            let gastosArray = [];

            // Funciones
            const mostrarDatos = () => {
                presupuesto.textContent = presupuestoTotal.toFixed(0);
                gastos.textContent = gastosTotal.toFixed(0);
                saldo.textContent = saldoTotal.toFixed(0);
            };

            const agregarGasto = () => {
                const nombre = nombreInput.value;
                const valor = Number(valorInput.value);

                if (!nombre || !valor) {
                    alert('Por favor ingrese un nombre y un valor para el gasto');
                    return;
                }

                if (valor > saldoTotal) {
                    alert('Fondos insuficientes para realizar este gasto');
                    return;
                }

                gastosTotal += valor;
                saldoTotal = presupuestoTotal - gastosTotal;
                gastosArray.push({ nombre, valor });
                mostrarDatos();
                mostrarGastos();
                nombreInput.value = '';
                valorInput.value = '';
            };

            const eliminarGasto = (index) => {
                const gastoEliminado = gastosArray.splice(index, 1);
                gastosTotal -= gastoEliminado[0].valor;
                saldoTotal = presupuestoTotal - gastosTotal;
                mostrarDatos();
                mostrarGastos();
            };

            const mostrarGastos = () => {
                gastosLista.innerHTML = '';
                gastosArray.forEach((gasto, index) => {
                    const gastoNombre = document.createElement('div');
                    gastoNombre.textContent = gasto.nombre;
                    gastoNombre.classList.add('d-flex', 'flex-fill');
                    const gastoValor = document.createElement('div');
                    gastoValor.textContent = gasto.valor.toFixed(0);
                    gastoValor.classList.add('d-flex', 'flex-fill');
                    const eliminarIcono = document.createElement('div');
                    const eliminarIconoI = document.createElement('i');
                    eliminarIconoI.classList.add('bi', 'bi-trash');
                    eliminarIconoI.style.cursor = 'pointer';
                    eliminarIconoI.addEventListener('click', () => eliminarGasto(index));
                    eliminarIcono.classList.add('d-flex', 'flex-fill', 'justify-content-end', 'align-items-center');
                    eliminarIcono.appendChild(eliminarIconoI);
                    const gastoItem = document.createElement('div');
                    gastoItem.classList.add('gasto-item', 'd-flex', 'justify-content-between', 'align-items-center');
                    const lineaItem = document.createElement('div');
                    lineaItem.classList.add('linea', 'd-flex', 'justify-content-between', 'align-items-center');
                    gastoItem.appendChild(gastoNombre);
                    gastoItem.appendChild(gastoValor);
                    gastoItem.appendChild(eliminarIcono);
                    gastosLista.appendChild(gastoItem);
                });
            };

            const calcularPresupuesto = () => {
                presupuestoTotal = Number(presupuestoInput.value);

                if (!presupuestoTotal) {
                    alert('Por favor ingrese un presupuesto válido');
                    return;
                }

                saldoTotal = presupuestoTotal - gastosTotal;
                mostrarDatos();
            };

            // Eventos
            calcularBtn.addEventListener('click', calcularPresupuesto);
            agregarBtn.addEventListener('click', agregarGasto);