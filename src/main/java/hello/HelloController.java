package hello;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Arrays;


@RestController
public class HelloController {

    @Autowired
    ApplicationContext ctx;

    @RequestMapping("/")
    public String index() {
        return "Greeting from Spring Boot";
    }

    @RequestMapping("/info")
    public String[] info() {
        String[] beanNames = ctx.getBeanDefinitionNames();
        Arrays.sort(beanNames);
        return beanNames;
    }

}
