package com.example.neurojuegos;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class VictoriaIdentifica extends AppCompatActivity {

    private int nivelActual;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_victoria_identifica);

        // Obtener el valor de nivelActual del Intent
        Intent intent = getIntent();
        nivelActual = intent.getIntExtra("nivel_maxIdentifica", 1); // 1 es el valor predeterminado si no se encuentra el dato

        Button btnNextLevelIdentifica = findViewById(R.id.btnNextLevelIdentifica);
        btnNextLevelIdentifica.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent;
                switch (nivelActual) {
                    case 1:
                        intent = new Intent(VictoriaIdentifica.this, Identifica2.class);
                        break;
                    case 2:
                        intent = new Intent(VictoriaIdentifica.this, Identifica3.class);
                        break;
                    case 3:
                        intent = new Intent(VictoriaIdentifica.this, Identifica4.class);
                        break;
                    case 4:
                        intent = new Intent(VictoriaIdentifica.this, Identifica5.class);
                        break;
                    case 5:
                        intent = new Intent(VictoriaIdentifica.this, Identifica6.class);
                        break;
                    case 6:
                        intent = new Intent(VictoriaIdentifica.this, Identifica7.class);
                        break;
                    case 7:
                        intent = new Intent(VictoriaIdentifica.this, Identifica8.class);
                        break;
                    case 8:
                        intent = new Intent(VictoriaIdentifica.this, Identifica9.class);

                        break;
                    case 9:
                        intent = new Intent(VictoriaIdentifica.this, Identifica10.class);
                        break;
                    case 10:
                        intent = new Intent(VictoriaIdentifica.this, Identifica11.class);
                        break;
                    case 11:
                        intent = new Intent(VictoriaIdentifica.this, Identifica12.class);
                        break;
                    case 12:
                        intent = new Intent(VictoriaIdentifica.this, Identifica13.class);
                        break;

                    case 13:
                        intent = new Intent(VictoriaIdentifica.this, Identifica14.class);
                        break;
                    case 14:
                        intent = new Intent(VictoriaIdentifica.this, Identifica15.class);
                        break;

                    case 15:
                        intent = new Intent(VictoriaIdentifica.this, Identifica16.class);
                        break;

                    case 16:
                        intent = new Intent(VictoriaIdentifica.this, niveles_identifica.class);
                        break;default:
                        // Si nivelActual no coincide con ningún caso, no hace nada
                        return;
                }

                startActivity(intent);
            }
        });

        Button repetir_nivel_identifica = findViewById(R.id.repetir_nivel_identifica);
        repetir_nivel_identifica.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent;
                switch (nivelActual) {
                    case 1:
                        intent = new Intent(VictoriaIdentifica.this, Identifica1.class);
                        break;
                    case 2:
                        intent = new Intent(VictoriaIdentifica.this, Identifica2.class);
                        break;
                    case 3:
                        intent = new Intent(VictoriaIdentifica.this, Identifica3.class);
                        break;
                    case 4:
                        intent = new Intent(VictoriaIdentifica.this, Identifica4.class);
                        break;
                    case 5:
                        intent = new Intent(VictoriaIdentifica.this, Identifica5.class);
                        break;
                    case 6:
                        intent = new Intent(VictoriaIdentifica.this, Identifica6.class);
                        break;
                    case 7:
                        intent = new Intent(VictoriaIdentifica.this, Identifica7.class);
                        break;
                    case 8:
                        intent = new Intent(VictoriaIdentifica.this, Identifica8.class);

                        break;
                    case 9:
                        intent = new Intent(VictoriaIdentifica.this, Identifica9.class);
                        break;
                    case 10:
                        intent = new Intent(VictoriaIdentifica.this, Identifica10.class);
                        break;
                    case 11:
                        intent = new Intent(VictoriaIdentifica.this, Identifica11.class);
                        break;
                    case 12:
                        intent = new Intent(VictoriaIdentifica.this, Identifica12.class);
                        break;
                    case 13:
                        intent = new Intent(VictoriaIdentifica.this, Identifica13.class);
                        break;
                    case 14:
                        intent = new Intent(VictoriaIdentifica.this, Identifica14.class);
                        break;
                    case 15:
                        intent = new Intent(VictoriaIdentifica.this, Identifica15.class);
                        break;
                    case 16:
                        intent = new Intent(VictoriaIdentifica.this, Identifica16.class);
                        break;
                    case 17:
                        intent = new Intent(VictoriaIdentifica.this, niveles_identifica.class);
                        break;default:
                        // Si nivelActual no coincide con ningún caso, no hace nada
                        return;
                }

                startActivity(intent);
            }
        });
    }



    public void Todos_Los_Niveles(View view){
        Intent intent=new Intent(VictoriaIdentifica.this,niveles_identifica.class);
        startActivity(intent);
    }



}