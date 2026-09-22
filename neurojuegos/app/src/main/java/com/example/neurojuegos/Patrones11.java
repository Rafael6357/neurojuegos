package com.example.neurojuegos;

import android.content.ContentValues;
import android.content.Intent;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.graphics.Color;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.os.Handler;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RadioButton;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import java.util.ArrayList;
import java.util.Random;

public class Patrones11 extends AppCompatActivity {

    // Declaración de variables y objetos
    private TextView instructionsTextView;
    private ImageView imageview1, imageview2, imageview3,imageview4;
    private ArrayList<Integer> pattern;
    private String nombreJugadorActual;
    private int currentStep;
    private boolean showingPattern;
    private Handler handler;

    private int nivelActual = 11;

    private TextView puntuajeTextView11;

    private Button reiniciarButton;

    private ImageView[] imageViews;
    private ArrayList<Integer> playerPattern;
    private CountDownTimer countDownTimer;
    int puntos = 0;

    // Método para iniciar el temporizador
    public void iniciarTemporizador() {
        // Configurar el temporizador para contar hacia atrás desde 5 segundos
        countDownTimer = new CountDownTimer(4000, 1000) {
            // Este método se llama cada segundo durante el tiempo de espera
            public void onTick(long millisUntilFinished) {
                // Mostrar el valor del contador en un TextView
                TextView contadorTextView = findViewById(R.id.contador_textview);
                contadorTextView.setText("" + millisUntilFinished / 1000);
            }

            // Este método se llama cuando el temporizador llega a cero
            public void onFinish() {
                // Ocultar el TextView del contador
                TextView contadorTextView = findViewById(R.id.contador_textview);
                contadorTextView.setVisibility(View.GONE);
            }
        }.start();
    }

    // Método onCreate()
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_patrones11);
        puntuajeTextView11= (TextView) findViewById(R.id.puntuaje_patrones11);

        imageViews = new ImageView[]{imageview1, imageview2, imageview3,imageview4};

        // Obtener la referencia del botón volver a niveles
        ImageView regresar_a_niveles = findViewById(R.id.regresarANiveles);

        // Agregar el método onClick del botón volver a niveles
        regresar_a_niveles.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Volver_A_Niveles();
            }
        });

        // Obtener la referencia del botón verificar
        Button verificarButton1 = findViewById(R.id.verificar11patrones);

        // Agregar el método onClick al botón verificar
        verificarButton1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Verificar11Respuesta();
            }
        });

        // Obtener la referencia del botón repetir niveles
        Button repetir_niveles = findViewById(R.id.repetir_nivel_patrones);

        // Agregar el método onClick al botón verificar
        repetir_niveles.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ReiniciarNivel();
            }
        });


        // Obtenemos los componentes de la vista
        instructionsTextView = findViewById(R.id.instructions_textview);
        imageview1 = findViewById(R.id.bt1);
        imageview2 = findViewById(R.id.bt2);
        imageview3 = findViewById(R.id.bt3);
        imageview4 = findViewById(R.id.bt4);
        verificarButton1 = findViewById(R.id.verificar11patrones);

        // Inicializamos las variables
        pattern = new ArrayList<>();
        currentStep = 0;
        showingPattern = false;
        handler = new Handler();

        // Llama al método iniciarTemporizador() para iniciar el CountDownTimer
        iniciarTemporizador();

        // Establecemos un retraso de 3 segundos antes de comenzar a ocultar las imágenes

        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                // Ocultamos la imagen 2 después de que haya transcurrido el tiempo del temporizador
                imageview4.setVisibility(View.INVISIBLE);
                handler.postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        // Ocultamos la imagen 1 después de 1 segundo
                        imageview1.setVisibility(View.INVISIBLE);
                        handler.postDelayed(new Runnable() {
                            @Override
                            public void run() {
                                // Ocultamos la imagen 3 después de 1 segundo
                                imageview3.setVisibility(View.INVISIBLE);
                                handler.postDelayed(new Runnable() {
                                    @Override
                                    public void run() {
                                        // Ocultamos la imagen 4 después de 1 segundo
                                        imageview2.setVisibility(View.INVISIBLE);

                                        // Mostramos todas las imágenes al mismo tiempo después de ocultar la imagen 4
                                        handler.postDelayed(new Runnable() {
                                            @Override
                                            public void run() {
                                                imageview1.setVisibility(View.VISIBLE);
                                                imageview2.setVisibility(View.VISIBLE);
                                                imageview3.setVisibility(View.VISIBLE);
                                                imageview4.setVisibility(View.VISIBLE);
                                                // Mostramos las instrucciones iniciales y habilitamos los botones
                                                instructionsTextView.setText("Selecciona el orden correcto en el que las imagenes desaparecieron");
                                                imageview1.setEnabled(true);
                                                imageview2.setEnabled(true);
                                                imageview3.setEnabled(true);
                                                imageview4.setEnabled(true);
                                            }
                                        }, 1000); // Establecemos un retraso de 1 segundo antes de mostrar las imágenes
                                    }
                                }, 1000); // Establecemos un retraso de 1 segundo antes de ocultar la imagen 3
                            }
                        }, 1000); // Establecemos un retraso de 1 segundo antes de ocultar la imagen 2
                    }
                }, 1000); // Establecemos un retraso de 1 segundo antes de ocultar la imagen 1
            }
        }, 5000); // Establecemos un retraso de 5 segundos antes de ocultar la imagen 1
    }

    // Método para reiniciar el nivel
    public void ReiniciarNivel() {
        // Reiniciar el nivel actual
        nivelActual = 11;

        // Volver a iniciar la actividad actual
        Intent intent = getIntent();
        finish();
        startActivity(intent);
    }

    // Método para volver a la pantalla de niveles
    public void Volver_A_Niveles() {
        Intent i = new Intent(this, niveles_patrones.class);
        startActivity(i);
    }

    public void Verificar11Respuesta() {
        // Obtener las referencias a los RadioButtons seleccionados en cada RadioGroup
        CheckBox radio1 = findViewById(R.id.check1);
        CheckBox radio2 = findViewById(R.id.check2);
        CheckBox radio3 = findViewById(R.id.check3);
        CheckBox radio4 = findViewById(R.id.check4);

        // Verificar si las respuestas son correctas
        if (radio4.isChecked()) {
            // Obtener la puntuación actual del TextView
            puntos = 5;

            // Actualizar el valor del puntuaje en el TextView
            puntuajeTextView11.setText(String.valueOf(puntos));
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////se mostro puntos
            int valor = 12;

            AdminSQLiteOpenHelper admin = new AdminSQLiteOpenHelper(this, "administracion", null, 2);
            SQLiteDatabase db = admin.getWritableDatabase();
            SharedPreferences preferences = getSharedPreferences("myPrefs", MODE_PRIVATE);
            String savedNames = preferences.getString("nombreJugadorActual", "");

            Cursor cursor = db.query("datos", new String[]{"nivel_maxPatrones"}, "nombre=?", new String[]{savedNames}, null, null, null);
            int nivelmax = 0;
            if (cursor.moveToFirst()) {
                nivelmax = cursor.getInt(0);
            }

            if (valor > nivelmax) {
                // Construir los valores a actualizar
                ContentValues values = new ContentValues();
                values.put("nivel_maxPatrones", valor);

                // Actualizar la fila correspondiente en la tabla 'datos'
                db.update("datos", values, "nombre = ?", new String[]{savedNames});

                // Cerrar la base de datos
                db.close();
            }

            guardarBaseDedatos();

            Toast.makeText(this, "¡EXCELENTE!!Te mereces 5 puntos.", Toast.LENGTH_SHORT).show();

            nivelActual = 11;
            // Después de incrementar nivelActual
            Intent intent = new Intent(Patrones11.this, VictoriaPatrones.class);
            intent.putExtra("nivel_maxPatrones", nivelActual);
            startActivity(intent);


        } else {
            Toast.makeText(this, "Lo siento, respuesta incorrecta,intenta de nuevo.", Toast.LENGTH_SHORT).show();
        }
    }

    private void guardarBaseDedatos() {

        // Obtener la puntuación acumulada actual desde la base de datos
        AdminSQLiteOpenHelper admin = new AdminSQLiteOpenHelper(this, "administracion", null, 2);
        SQLiteDatabase db = admin.getWritableDatabase();
        SharedPreferences preferences = getSharedPreferences("myPrefs", MODE_PRIVATE);
        String savedNames = preferences.getString("nombreJugadorActual", "");
        Cursor cursor = db.query("datos", new String[]{"puntuacionPatrones"}, "nombre=?", new String[]{savedNames}, null, null, null);
        int puntuacionAcumulada = 0;
        if (cursor.moveToFirst()) {
            puntuacionAcumulada = cursor.getInt(0);
        }
        cursor.close();

        // Sumar la puntuación actual a la puntuación acumulada
        int puntuacionNueva = puntos + puntuacionAcumulada;

        // Crear un ContentValues con los valores a insertar
        ContentValues registro = new ContentValues();
        registro.put("puntuacionPatrones", puntuacionNueva);

        // Actualizar la base de datos con la nueva puntuación acumulada
        db.update("datos", registro, "nombre=?", new String[]{savedNames});
        db.close();


    }
}

