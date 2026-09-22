package com.example.neurojuegos;

import androidx.appcompat.app.AppCompatActivity;

import android.content.ContentValues;
import android.content.Intent;
import android.content.SharedPreferences;
import android.database.Cursor;
import android.database.sqlite.SQLiteDatabase;
import android.os.Bundle;
import android.os.Handler;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Random;

public class AdivinaLaPalabra10 extends AppCompatActivity {
    private String palabraOculta;
    private int intentosRestantes;

    private int nivelActual = 10;

    private ArrayList<String> listaPalabras = new ArrayList<>(Arrays.asList("JUEGO", "AMIGO", "PERRO"));
    private ImageView imagenAhorcado0;
    private ImageView imagenAhorcado1;
    private ImageView imagenAhorcado2;
    private ImageView imagenAhorcado3;
    private TextView textoPalabraOculta;
    private TextView textoIntentosRestantes;
    private EditText textoLetraIngresada;
    private Button botonIngresarLetra;
    private ArrayList<String> letrasIngresadas = new ArrayList<>();

    private TextView puntuajeTextView10;

    private HashMap<String, String> pistasPalabras = new HashMap<String, String>() {{
        put("JUEGO", "Pista:Lo disfrutas y te diviertes mientras lo juegas.");
        put("AMIGO", "Pista:Alguien con quien te llevas muy bien.");
        put("PERRO", "Pista:Un animal que puede ser tu mascota.");
    }};

    int puntos = 0;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_adivina_la_palabra10);

        puntuajeTextView10 = (TextView) findViewById(R.id.puntuaje_adivina10);

        // Obtener la referencia del botón volver a niveles
        ImageView regresar_a_niveles = findViewById(R.id.regresarANiveles);

        // Agregar el método onClick del botón volver a niveles
        regresar_a_niveles.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Volver_A_Niveles();
            }
        });

        Button repetir_nivel_adivina = findViewById(R.id.repetir_nivel_adivina);

        repetir_nivel_adivina.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                finish();
            }
        });


        // Obtener referencias a las vistas de la interfaz
        imagenAhorcado3 = findViewById(R.id.imagen_ahorcado3);
        imagenAhorcado2 = findViewById(R.id.imagen_ahorcado2);
        imagenAhorcado1 = findViewById(R.id.imagen_ahorcado1);
        imagenAhorcado0 = findViewById(R.id.imagen_ahorcado);

        textoPalabraOculta = findViewById(R.id.texto_palabra_oculta);
        textoIntentosRestantes = findViewById(R.id.texto_intentos_restantes);
        textoLetraIngresada = findViewById(R.id.texto_letra_ingresada);
        botonIngresarLetra = findViewById(R.id.boton_ingresar_letra);

        // Definir la lista de palabras
        listaPalabras = new ArrayList<>(Arrays.asList("JUEGO", "AMIGO", "PERRO"));

        // Iniciar un nuevo juego
        iniciarJuego();
    }

    public void iniciarJuego() {
        //La palabra oculta que debe adivinar el usuario
        Random random = new Random();
        palabraOculta = listaPalabras.get(random.nextInt(listaPalabras.size()));


        // Obtener la pista de la palabra oculta
        String pista = pistasPalabras.get(palabraOculta);

        // Mostrar la pista en un TextView
        TextView textoPista = findViewById(R.id.texto_pista);
        textoPista.setText(pista);

        // Inicializar el número de intentos restantes y la imagen del ahorcado
        intentosRestantes = 3;
        imagenAhorcado3.setImageResource(R.drawable.imagen_ahorcado_impar);
        imagenAhorcado2.setImageResource(R.drawable.imagen_ahorcado_par);
        imagenAhorcado1.setImageResource(R.drawable.imagen_ahorcado_impar);
        imagenAhorcado0.setImageResource(R.drawable.imagen_ahorcado_par);

        // Ocultar la palabra oculta y mostrar el número de guiones bajos correspondiente
        textoPalabraOculta.setText("");
        for (int i = 0; i < palabraOculta.length(); i++) {
            textoPalabraOculta.append("_ ");
        }

        // Mostrar el número de intentos restantes
        textoIntentosRestantes.setText(getString(R.string.intentos_restantes, intentosRestantes));

        // Limpiar el campo de texto de la letra ingresada
        textoLetraIngresada.setText("");

        // Habilitar el botón de ingresar letra
        botonIngresarLetra.setEnabled(true);

        // Limpiar la lista de letras ingresadas
        letrasIngresadas.clear();
    }
    public void ingresarLetra(View view) {
        // Obtener la letra ingresada por el usuario
        String letraIngresada = textoLetraIngresada.getText().toString().toUpperCase();

        // Validar que se haya ingresado una letra
        if (letraIngresada.isEmpty()) {
            Toast.makeText(this, "Debe ingresar una letra", Toast.LENGTH_SHORT).show();
            return;
        }

        // Validar que la letra ingresada no se haya ingresado antes
        if (letrasIngresadas.contains(letraIngresada)) {
            Toast.makeText(this, "Ya ha ingresado esa letra antes", Toast.LENGTH_SHORT).show();
            return;
        }

        // Agregar la letra ingresada a la lista de letras ingresadas
        letrasIngresadas.add(letraIngresada);

        // Verificar si la letra ingresada está presente en la palabra oculta
        boolean letraEncontrada = false;
        for (int i = 0; i < palabraOculta.length(); i++) {
            if (palabraOculta.charAt(i) == letraIngresada.charAt(0)) {
                // La letra ingresada está presente en la palabra oculta, mostrarla en la cadena de texto correspondiente
                StringBuilder builder = new StringBuilder(textoPalabraOculta.getText().toString());
                builder.setCharAt(i * 2, letraIngresada.charAt(0));
                textoPalabraOculta.setText(builder.toString());
                letraEncontrada = true;

            }
        }

        // Disminuir el número de intentos restantes si la letra ingresada no está presente en la palabra oculta
        if (!letraEncontrada) {
            intentosRestantes--;

            // Ocultar la imagen correspondiente al número de intentos restantes
            switch (intentosRestantes) {
                case 3:
                    imagenAhorcado3.setVisibility(View.GONE);
                    break;
                case 2:
                    imagenAhorcado2.setVisibility(View.GONE);
                    break;
                case 1:
                    imagenAhorcado1.setVisibility(View.GONE);
                    break;
                case 0:
                    imagenAhorcado0.setVisibility(View.GONE);
                    break;
            }
        }

        // Verificar si se ha adivinado la palabra oculta
        if (textoPalabraOculta.getText().toString().replace(" ", "").equals(palabraOculta)) {

            // Obtener la puntuación actual del TextView
            puntos=2;

            // Actualizar el valor del puntuaje en el TextView
            puntuajeTextView10.setText(String.valueOf(puntos));

            int valor=11;

            AdminSQLiteOpenHelper admin = new AdminSQLiteOpenHelper(this, "administracion", null, 2);
            SQLiteDatabase db = admin.getWritableDatabase();
            SharedPreferences preferences = getSharedPreferences("myPrefs", MODE_PRIVATE);
            String savedNames = preferences.getString("nombreJugadorActual", "");

            Cursor cursor = db.query("datos", new String[]{"nivel_maxAdivina"}, "nombre=?", new String[]{savedNames}, null, null, null);
            int nivelmax = 0;
            if (cursor.moveToFirst()) {
                nivelmax = cursor.getInt(0);
            }

            if(valor > nivelmax) {
                // Construir los valores a actualizar
                ContentValues values = new ContentValues();
                values.put("nivel_maxAdivina", valor);

                // Actualizar la fila correspondiente en la tabla 'datos'
                db.update("datos", values, "nombre = ?", new String[]{savedNames});

                // Cerrar la base de datos
                db.close();
            }

            guardarBaseDedatos();

            Toast.makeText(this, "¡Correcto! Has ganado 2 puntos.", Toast.LENGTH_SHORT).show();

            nivelActual=10;
            // Después de incrementar nivelActual
            Intent intent = new Intent(AdivinaLaPalabra10.this, VictoriaAdivinaLaPalabra.class);
            intent.putExtra("nivel_maxAdivina", nivelActual);
            startActivity(intent);

            botonIngresarLetra.setEnabled(false);
            return;

        }

        // Verificar si se han agotado los intentos
        if (intentosRestantes == 0) {
            Toast.makeText(this, "Ha perdido,intente de nuevo,seguro que lo vas a lograr", Toast.LENGTH_LONG).show();
            botonIngresarLetra.setEnabled(false);
            return;
        }

        // Mostrar el número de intentos restantes
        textoIntentosRestantes.setText(getString(R.string.intentos_restantes, intentosRestantes));

        // Limpiar el campo de texto de la letra ingresada
        textoLetraIngresada.setText("");
    }

    // Método para reiniciar el nivel
    public void ReiniciarNivel() {
        // Reiniciar el nivel actual
        nivelActual = 10;

        // Volver a iniciar la actividad actual
        Intent intent = getIntent();
        finish();
        startActivity(intent);
    }

    // Método para volver a la pantalla de niveles
    public void Volver_A_Niveles() {
        Intent i = new Intent(this, niveles_adivina_la_palabra.class);
        startActivity(i);
    }

    private void guardarBaseDedatos() {

        // Obtener la puntuación acumulada actual desde la base de datos
        AdminSQLiteOpenHelper admin = new AdminSQLiteOpenHelper(this, "administracion", null, 2);
        SQLiteDatabase db = admin.getWritableDatabase();
        SharedPreferences preferences = getSharedPreferences("myPrefs", MODE_PRIVATE);
        String savedNames = preferences.getString("nombreJugadorActual", "");
        Cursor cursor = db.query("datos", new String[]{"puntuacionCadenaNum"}, "nombre=?", new String[]{savedNames}, null, null, null);
        int puntuacionAcumulada = 0;
        if (cursor.moveToFirst()) {
            puntuacionAcumulada = cursor.getInt(0);
        }
        cursor.close();

        // Sumar la puntuación actual a la puntuación acumulada
        int puntuacionNueva = puntos + puntuacionAcumulada;

        // Crear un ContentValues con los valores a insertar
        ContentValues registro = new ContentValues();
        registro.put("puntuacionCadenaNum", puntuacionNueva);

        // Actualizar la base de datos con la nueva puntuación acumulada
        db.update("datos", registro, "nombre=?", new String[]{savedNames});
        db.close();

    }

}
