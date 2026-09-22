package com.example.neurojuegos;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class VictoriaPatrones extends AppCompatActivity {

    private int nivelActual;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_victoria_patrones);

        // Obtener el valor de nivelActual del Intent
        Intent intent = getIntent();
        nivelActual = intent.getIntExtra("nivel_maxPatrones", 1); // 1 es el valor predeterminado si no se encuentra el dato

        Button btnNextLevelPatrones = findViewById(R.id.btnNextLevelPatrones);
        btnNextLevelPatrones.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent;
                switch (nivelActual) {
                    case 1:
                        intent = new Intent(VictoriaPatrones.this, Patrones2.class);
                        break;
                    case 2:
                        intent = new Intent(VictoriaPatrones.this, Patrones3.class);
                        break;
                    case 3:
                        intent = new Intent(VictoriaPatrones.this, Patrones4.class);

                        break;
                    case 4:
                        intent = new Intent(VictoriaPatrones.this, Patrones5.class);
                        break;
                    case 5:
                        intent = new Intent(VictoriaPatrones.this, Patrones6.class);
                        break;
                    case 6:
                        intent = new Intent(VictoriaPatrones.this, Patrones7.class);

                        break;
                    case 7:
                        intent = new Intent(VictoriaPatrones.this, Patrones8.class);

                        break;
                    case 8:
                        intent = new Intent(VictoriaPatrones.this, Patrones9.class);


                        break;
                    case 9:
                        intent = new Intent(VictoriaPatrones.this, Patrones10.class);

                        break;
                    case 10:
                        intent = new Intent(VictoriaPatrones.this, Patrones11.class);
                        break;
                    case 11:
                        intent = new Intent(VictoriaPatrones.this, Patrones12.class);

                        break;
                    case 12:
                        intent = new Intent(VictoriaPatrones.this, Patrones13.class);

                        break;

                    case 13:
                        intent = new Intent(VictoriaPatrones.this, Patrones14.class);

                        break;
                    case 14:
                        intent = new Intent(VictoriaPatrones.this, Patrones15.class);

                        break;

                    case 15:
                        intent = new Intent(VictoriaPatrones.this, Patrones16.class);

                        break;

                    case 16:
                        intent = new Intent(VictoriaPatrones.this, niveles_patrones.class);

                        break;default:
                        // Si nivelActual no coincide con ningún caso, no hace nada
                        return;
                }

                startActivity(intent);
            }
        });

        Button repetir_nivel_patrones = findViewById(R.id.repetir_nivel_patrones);
        repetir_nivel_patrones.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent;
                switch (nivelActual) {
                    case 1:
                        intent = new Intent(VictoriaPatrones.this, Patrones1.class);
                        break;
                    case 2:
                        intent = new Intent(VictoriaPatrones.this, Patrones2.class);
                        break;
                    case 3:
                        intent = new Intent(VictoriaPatrones.this, Patrones3.class);
                        break;
                    case 4:
                        intent = new Intent(VictoriaPatrones.this, Patrones4.class);
                        break;
                    case 5:
                        intent = new Intent(VictoriaPatrones.this, Patrones5.class);
                        break;
                    case 6:
                        intent = new Intent(VictoriaPatrones.this, Patrones6.class);
                        break;
                    case 7:
                        intent = new Intent(VictoriaPatrones.this, Patrones7.class);
                        break;
                    case 8:
                        intent = new Intent(VictoriaPatrones.this, Patrones8.class);

                        break;
                    case 9:
                        intent = new Intent(VictoriaPatrones.this, Patrones9.class);
                        break;
                    case 10:
                        intent = new Intent(VictoriaPatrones.this, Patrones10.class);
                        break;
                    case 11:
                        intent = new Intent(VictoriaPatrones.this, Patrones11.class);
                        break;
                    case 12:
                        intent = new Intent(VictoriaPatrones.this, Patrones12.class);
                        break;
                    case 13:
                        intent = new Intent(VictoriaPatrones.this, Patrones13.class);
                        break;
                    case 14:
                        intent = new Intent(VictoriaPatrones.this, Patrones14.class);
                        break;
                    case 15:
                        intent = new Intent(VictoriaPatrones.this, Patrones15.class);
                        break;
                    case 16:
                        intent = new Intent(VictoriaPatrones.this, Patrones16.class);
                        break;
                    case 17:
                        intent = new Intent(VictoriaPatrones.this, niveles_patrones.class);
                        break;default:
                        // Si nivelActual no coincide con ningún caso, no hace nada
                        return;
                }

                startActivity(intent);
            }
        });
    }



    public void Todos_Los_Niveles(View view){
        Intent intent=new Intent(this,niveles_patrones.class);
        startActivity(intent);
    }



}