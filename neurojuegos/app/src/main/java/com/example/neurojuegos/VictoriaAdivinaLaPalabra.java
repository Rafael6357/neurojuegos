package com.example.neurojuegos;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;

public class VictoriaAdivinaLaPalabra extends AppCompatActivity {

    private int nivelActual;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_victoria_adivina_la_palabra);

        // Obtener el valor de nivelActual del Intent
        Intent intent = getIntent();
        nivelActual = intent.getIntExtra("nivel_maxAdivina", 1); // 1 es el valor predeterminado si no se encuentra el dato

        Button btnNextLevelAdivina = findViewById(R.id.btnNextLevelAdivina);
        btnNextLevelAdivina.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent;
                switch (nivelActual) {
                    case 1:
                        intent = new Intent(VictoriaAdivinaLaPalabra.this, AdivinaLaPalabra2.class);
                        break;
                    case 2:
                        intent = new Intent(VictoriaAdivinaLaPalabra.this, AdivinaLaPalabra3.class);
                        break;
                    case 3:
                        intent = new Intent(VictoriaAdivinaLaPalabra.this, AdivinaLaPalabra4.class);
                        break;
                    case 4:
                        intent = new Intent(VictoriaAdivinaLaPalabra.this, AdivinaLaPalabra5.class);
                        break;
                    case 5:
                        intent = new Intent(VictoriaAdivinaLaPalabra.this, AdivinaLaPalabra6.class);
                        break;
                    case 6:
                        intent = new Intent(VictoriaAdivinaLaPalabra.this, AdivinaLaPalabra7.class);
                        break;
                    case 7:
                        intent = new Intent(VictoriaAdivinaLaPalabra.this, AdivinaLaPalabra8.class);
                        break;
                    case 8:
                        intent = new Intent(VictoriaAdivinaLaPalabra.this, AdivinaLaPalabra9.class);

                        break;
                    case 9:
                        intent = new Intent(VictoriaAdivinaLaPalabra.this, AdivinaLaPalabra10.class);
                        break;
                    case 10:
                        intent = new Intent(VictoriaAdivinaLaPalabra.this, AdivinaLaPalabra11.class);
                        break;
                    case 11:
                        intent = new Intent(VictoriaAdivinaLaPalabra.this,AdivinaLaPalabra12.class);
                        break;
                    case 12:
                        intent = new Intent(VictoriaAdivinaLaPalabra.this,AdivinaLaPalabra13.class);
                        break;

                    case 13:
                        intent = new Intent(VictoriaAdivinaLaPalabra.this, AdivinaLaPalabra14.class);
                        break;
                    case 14:
                        intent = new Intent(VictoriaAdivinaLaPalabra.this, AdivinaLaPalabra15.class);
                        break;

                    case 15:
                        intent = new Intent(VictoriaAdivinaLaPalabra.this, AdivinaLaPalabra16.class);
                        break;

                    case 16:
                        intent = new Intent(VictoriaAdivinaLaPalabra.this, niveles_adivina_la_palabra.class);
                        break;default:
                        // Si nivelActual no coincide con ningún caso, no hace nada
                        return;
                }

                startActivity(intent);
            }
        });

        Button repetir_nivel_adivina = findViewById(R.id.repetir_nivel_adivina);
        repetir_nivel_adivina.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent;
                switch (nivelActual) {
                    case 1:
                        intent = new Intent(VictoriaAdivinaLaPalabra.this, AdivinaLaPalabra1.class);
                        break;
                    case 2:
                        intent = new Intent(VictoriaAdivinaLaPalabra.this,AdivinaLaPalabra2.class);
                        break;
                    case 3:
                        intent = new Intent(VictoriaAdivinaLaPalabra.this, AdivinaLaPalabra3.class);
                        break;
                    case 4:
                        intent = new Intent(VictoriaAdivinaLaPalabra.this, AdivinaLaPalabra4.class);
                        break;
                    case 5:
                        intent = new Intent(VictoriaAdivinaLaPalabra.this, AdivinaLaPalabra5.class);
                        break;
                    case 6:
                        intent = new Intent(VictoriaAdivinaLaPalabra.this, AdivinaLaPalabra6.class);
                        break;
                    case 7:
                        intent = new Intent(VictoriaAdivinaLaPalabra.this, AdivinaLaPalabra7.class);
                        break;
                    case 8:
                        intent = new Intent(VictoriaAdivinaLaPalabra.this, AdivinaLaPalabra8.class);

                        break;
                    case 9:
                        intent = new Intent(VictoriaAdivinaLaPalabra.this, AdivinaLaPalabra9.class);
                        break;
                    case 10:
                        intent = new Intent(VictoriaAdivinaLaPalabra.this, AdivinaLaPalabra10.class);
                        break;
                    case 11:
                        intent = new Intent(VictoriaAdivinaLaPalabra.this, AdivinaLaPalabra11.class);
                        break;
                    case 12:
                        intent = new Intent(VictoriaAdivinaLaPalabra.this, AdivinaLaPalabra12.class);
                        break;
                    case 13:
                        intent = new Intent(VictoriaAdivinaLaPalabra.this, AdivinaLaPalabra13.class);
                        break;
                    case 14:
                        intent = new Intent(VictoriaAdivinaLaPalabra.this, AdivinaLaPalabra14.class);
                        break;
                    case 15:
                        intent = new Intent(VictoriaAdivinaLaPalabra.this, AdivinaLaPalabra15.class);
                        break;
                    case 16:
                        intent = new Intent(VictoriaAdivinaLaPalabra.this, AdivinaLaPalabra16.class);
                        break;
                    case 17:
                        intent = new Intent(VictoriaAdivinaLaPalabra.this, niveles_adivina_la_palabra.class);
                        break;default:
                        // Si nivelActual no coincide con ningún caso, no hace nada
                        return;
                }

                startActivity(intent);
            }
        });
    }

    public void Todos_Los_Niveles(View view){
        Intent intent=new Intent(VictoriaAdivinaLaPalabra.this,niveles_adivina_la_palabra.class);
        startActivity(intent);
    }

}