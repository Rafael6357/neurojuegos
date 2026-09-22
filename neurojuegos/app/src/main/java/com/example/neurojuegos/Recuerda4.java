package com.example.neurojuegos;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.ImageView;
import android.widget.Toast;

import java.util.Random;

public class Recuerda4 extends AppCompatActivity {

    private ImageView cell1;
    private ImageView cell2;
    private ImageView cell3;
    private ImageView cell4;
    private ImageView imageView1;
    private ImageView imageView2;
    private ImageView imageView3;
    private ImageView imageView4;
    private ImageView visible1;
    private ImageView visible2;
    private ImageView visible3;
    private ImageView visible4;
    private String[] items = {"libro", "cepillo", "cuchara", "guineo"};
    private int correctIndex;
    private String correctItem;
    private boolean isVisible1Clickable = false; // Para evitar múltiples clics en visible1

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_recuerda4);

        cell1 = findViewById(R.id.cell1);
        cell2 = findViewById(R.id.cell2);
        cell3 = findViewById(R.id.cell3);
        cell4 = findViewById(R.id.cell4);
        imageView1 = findViewById(R.id.imageView1);
        imageView2 = findViewById(R.id.imageView2);
        imageView3 = findViewById(R.id.imageView3);
        imageView4 = findViewById(R.id.imageView4);
        visible1 = findViewById(R.id.visible1);
        visible2 = findViewById(R.id.visible2);
        visible3 = findViewById(R.id.visible3);
        visible4 = findViewById(R.id.visible4);

        ImageView regresarANiveles11 = findViewById(R.id.regresarANiveles11);
        regresarANiveles11.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(Recuerda4.this, niveles_recuerda.class);
                startActivity(intent);
                finish();
            }
        });
        setupGame();
        showMessage("Recuerda la posición de todas las imágenes antes de que desaparezcan.");
    }

    private void setupGame() {
        correctIndex = getRandomIndex();
        correctItem = items[correctIndex];

        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {

                // Mostrar las ImageView visible1, visible2, visible3 y visible4
                visible1.setVisibility(View.VISIBLE);
                visible2.setVisibility(View.VISIBLE);
                visible3.setVisibility(View.VISIBLE);
                visible4.setVisibility(View.VISIBLE);

                hacerInvisible();
            }
        }, 5000);

    }

    private void hacerInvisible(){


        showMessage("Toca el recuadro donde se encontraba un libro.");

        // Configurar clic en la ImageView "visible1"
        visible1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                showMessage("¡VICTORIA! Has seleccionado la imagen correcta");

                // Redirigir inmediatamente a la actividad VictoriaRecuerda
                Intent intent = new Intent(Recuerda4.this, VictoriaRecuerda.class);
                startActivity(intent);
            }
        });

        // Configurar clic en las otras ImageView
        visible2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                showMessage("¡INTENTE DE NUEVO! Respuesta incorrecta");
            }
        });

        visible3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                showMessage("¡INTENTE DE NUEVO! Respuesta incorrecta");
            }
        });

        visible4.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                showMessage("¡INTENTE DE NUEVO! Respuesta incorrecta");
            }
        });
    }



    private void showMessage(String message) {
        Toast.makeText(this, message, Toast.LENGTH_LONG).show();
    }

    private int getRandomIndex() {
        Random random = new Random();
        return random.nextInt(items.length);
    }
}
