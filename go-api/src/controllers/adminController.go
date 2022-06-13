package controllers

import (
	"encoding/json"
	"fmt"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/config"
	"github.com/rasel-mahmud-dev/mobile-shop-api/src/console"
	"html/template"
	"io/ioutil"
	"net/http"
	"os"
	"strconv"
)

// var tpl  *template.Template

// func init() {
// 		// tpl = template.Must(template.ParseGlob("src/views/*"))
// }

func LoginAsAdmin(w http.ResponseWriter, r *http.Request) {

	if config.SECRET_KEY == r.FormValue("secret") {
		tmp1, err := template.ParseFiles("src/views/admin_home_page.gohtml")
		if err != nil {
			fmt.Println(err)
			return
		}
		files, err := ioutil.ReadDir("src/logs")
		if err != nil {
			return
		}

		var result []interface{}

		for _, file := range files {
			fmt.Println(file.Name())
			result = append(result, map[string]string{
				"name": file.Name(),
				"path": "src/logs/" + file.Name(),
			})
		}

		tmp1.Execute(w, result)
	}

}

func AdminLoginPage(w http.ResponseWriter, r *http.Request) {
	tmp1, err := template.ParseFiles("src/views/admin_login_page.gohtml")
	if err != nil {
		fmt.Println(err)
		return
	}

	tmp1.Execute(w, nil)

}

func AdminLogFileContent(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	var body map[string]string
	json.NewDecoder(r.Body).Decode(&body)

	content, err := ioutil.ReadFile(body["path"])
	if err != nil {
		return
	}

	json.NewEncoder(w).Encode(map[string]string{
		"content": string(content),
	})

	// fmt.Println(string(content))

	// flusher := w.(http.Flusher)
	// w.Header().Set("Connection", "Keep-Alive")
	// Don't need these this bc manually flushing sets this header
	// w.Header().Set("Transfer-Encoding", "chunked")

	// make sure this header is set
	// w.Header().Set("X-Content-Type-Options", "nosniff")
	// ticker := time.NewTicker(time.Millisecond * 500)
	//
	// file, err := ioutil.ReadFile("/d")
	// if err != nil {
	// 	return
	// }
	//
	// bufio.NewReader(file)

	// go func() {
	// 	for t := range ticker.C {
	// 		// #2 add '\n'
	// 		io.WriteString(w, "Chunk\n")
	// 		fmt.Println("Tick at", t)
	// 		flusher.Flush()
	// 	}
	// }()
	// time.Sleep(time.Second * 5)
	// ticker.Stop()
	// fmt.Println("Finished: should return Content-Length: 0 here")
	// w.Header().Set("Content-Length", "0")

}

func GetLogs(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	var body map[string]string
	json.NewDecoder(r.Body).Decode(&body)

	files, err := ioutil.ReadDir("src/logs")
	if err != nil {
		return
	}

	var result []interface{}

	for _, file := range files {
		result = append(result, map[string]string{
			"name": file.Name(),
			"path": "src/logs/" + file.Name(),
			"size": strconv.FormatInt(file.Size(), 10),
		})
	}
	w.WriteHeader(200)
	err = json.NewEncoder(w).Encode(&result)
	if err != nil {
		return
	}
}

func GetLog(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	var body map[string]string
	json.NewDecoder(r.Body).Decode(&body)

	content, err := ioutil.ReadFile(body["path"])
	if err != nil {
		return
	}

	w.WriteHeader(200)
	json.NewEncoder(w).Encode(map[string]string{
		"content": string(content),
	})

}

func DeleteLog(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	var body map[string]string
	json.NewDecoder(r.Body).Decode(&body)

	err := os.Remove(body["path"])
	if err != nil {
		console.SaveLog(err.Error() + "  \n " + body["path"] + " delete fail")
		w.WriteHeader(404)
		json.NewEncoder(w).Encode(map[string]string{
			"message": "file not found",
		})
		return
	}
	w.WriteHeader(201)
	_, err = fmt.Fprint(w, "deleted")
	if err != nil {
		return
	}
}
